import { reactive, watch, ref, computed } from 'vue'
import { data, copyEffect } from './data/index.js'

const status_curses = 'JoltedHangoverWeakMarkedExposedChillRuptureDoom'
const gods = 'AphroditeAresArtemisAthenaDemeterDionysusPoseidonZeus'
const no_crit = 'boltrupture'

const formatId = (id) => `${id < 36 ? '0' : ''}${id.toString(36)}`
const formatValue = (value) => `${Math.min(35,value).toString(36)}`
const include = reactive({})
const exclude = reactive({})
const watchPrereqs = (prereqs) =>
  prereqs.reduce((a, v) => {
    a[v] = computed(() => include[v] ? true : false)
    return a
  }, {})

// Make trait data reactive and add inclusion/exlusion properties
const trait_data = data.traits.map((t, i) => {
  const trait = reactive(t)
  trait.id = formatId(i)
  const prereqs = t.prereqs
  trait.prereqs = (prereqs)
    ? Object.keys(prereqs).reduce((p, k) => {
        p[k] = watchPrereqs(prereqs[k])
        return p
      }, {})
    : null

  trait.active = prereqs
    ? computed(() => {
        const threshold = trait.threshold
        if (threshold) {
          return Object.keys(prereqs).reduce((a, key) =>
            prereqs[key].reduce((_a, _v) => include[_v] ? _a+1 : _a, 0) >= threshold, true
          )
        } else {
          return Object.keys(prereqs).reduce((a, v) =>
            prereqs[v].reduce((_a, _v) => include[_v] ? _a+1 : _a, 0) && a, true
          )
        }
      })
    : true
  return trait
})

// Creates a new reactive object with base trait as prototype
// Adds level, rarity, and description properties for each trait instance
function wrapTrait(trait) {
  const t = reactive(Object.create(trait))
  const r = t.rarity = ref(trait.rarity)
  const l = t.level = ref(trait.level || null)

  const td = trait.description
  const d = t.description = ref(typeof td === 'string' ? td : '')

  if (typeof td === 'function') {
    watch([r, l], () => d.value = td(getTraitContext(t)), { immediate: true })
  }

  return t
}

const effect_categories = ['abilities', 'effects', 'mods']
function getTraitContext(trait) {
  const stats = {}
  for (let key of effect_categories) {
    let effects = trait[key]
    if (effects === undefined) continue

    for (let effect of effects) {
      Object.assign(stats, extractData(effect.stats, trait.rarity, trait.level, effect.pom))
      Object.assign(stats, extractData(effect.status, trait.rarity, trait.level, effect.pom))
    }
  }
  return stats
}

function _pom() { return 0 }
function extractData (target, rarity, level, pom = _pom) {
  if (target === undefined) return
  return Object.keys(target).reduce((extracted, k) => {
    const v = target[k]
    extracted[k] = (Array.isArray(v))
      ? v[rarity] + pom(level, v[0])
      : v
    return extracted
  }, {})
}

function selectTrait(props) {
  let success
  for (let trait of trait_data) {
    success = true
    for (let k in props) {
      if (props[k].indexOf(trait[k]) === -1)
        success = false
    }
    if (success) return wrapTrait(trait)
  }
  console.warn('selectTrait failed to find a trait with props:', props)
  return null
}

function filterObjects(obj_arr, props) {
  return obj_arr.filter((b) => {
    for (const k in props) {
      if (props[k].indexOf(b[k]) === -1) return false
    }
    return true
  })
}

const player = reactive({
  ...data.player,
  stats: { ...data.player.stats },
  status: { ...data.player.status },
})

const foe = reactive({
  ...data.foe,
  stats: { ...data.foe.stats },
  status: { ...data.foe.status },
})

const mirror = reactive({
  presence: { selection: 0, rank: 1 },
  reflex: { selection: 0, rank: 1 },
  blood: { selection: 0, rank: 1 },
  soul: { selection: 0, rank: 1 },
  skin: { selection: 0, rank: 1 },
  privilege: { selection: 0, rank: 1 },
})

const traits = reactive([
  selectTrait({ name: 'base', type: 'attack' }),
  selectTrait({ name: 'base', type: 'special' }),
  selectTrait({ name: 'base', type: 'cast' }),
  selectTrait({ name: 'base', type: 'dash' }),
  selectTrait({ name: 'base', type: 'call' }),
  selectTrait({ name: 'base', type: 'keepsake' }),
  selectTrait({ weapon: 'Stygius', name: 'Stygius - Aspect of Zagreus' }),
])

const store = reactive({
  placeholder: data.placeholder,
  hover: null,
  selected: null,
  mirror,
  traits,
  weapon: selectTrait({ name: 'Stygius' }),
  player,
  foe,
})


function extractTraitData(build, trait_data, build_data, god, rarity, level, overwrite) {
  if (trait_data === undefined) return  // trait_data = abilties[] / effects[] / mods[]

  const extracted = trait_data.reduce((acc, v) => {
    const key = v.trigger || v.type
    if (v.type === null) {
      acc[key] = null
      return acc
    }
    const effect = Object.create(v)
    god && (effect.god = god)
    effect.stats = extractData(v.stats, rarity, level, v.pom) || {}
    effect.effects = []

    if (effect.status = extractData(v.status, rarity, level, v.pom)) {
      const applied = applyStatus(build, effect)
      if (!applied && effect.target) return acc
    }

    if (acc[key] === undefined) acc[key] = [effect]
    else acc[key].push(effect)
    return acc
  }, {})

  // overwrite or merge trigger_dir
  for (let k in extracted) {
    const v = extracted[k]
    if (v === null) delete build_data[k]
    else build_data[k] = ((build_data[k] === undefined) || overwrite)
      ? v
      : [ ...build_data[k], ...v ]
  }
}

function extractTrait(trait, build) {
  const level = trait.level
  const rarity = trait.rarity

  // register inclusions/exclusions
  build.include[trait.name] = true
  if (trait.type !== 'weapon' && 'ChaosCharon'.indexOf(trait.god) === -1)
    build.exclude[trait.name] = true
  const exclude = trait.exclude
  exclude && exclude.reduce((a, v) => {
    build.exclude[v] = true
  }, null)

  const god = trait.god
  if (Array.isArray(god)) {
    for (const g in god) build.gods[g] = true
  } else {
    build.gods[god] = true
  }

  // Add features
  if (trait.feature)
    build.features.push(trait.feature(getTraitContext(trait)))

  // extract stats data
  extractTraitData(build, trait.abilities, build.abilities, trait.god, rarity, level, true)
  extractTraitData(build, trait.effects, build.effects, trait.god, rarity, level)
  extractTraitData(build, trait.mods, build.mods, trait.god, rarity, level)
}

function createDirectories(trigger_dir, initial) {
  return Object.keys(trigger_dir).reduce(
    (acc, trigger) => {
      const n = acc.name
      const t = acc.type
      const effects = trigger_dir[trigger]
      for (let effect of effects) {
        ;(t[effect.type])
          ? t[effect.type].push(effect)
          : t[effect.type] = [effect]
        ;(n[effect.name])
          ? n[effect.name].push(effect)
          : n[effect.name] = [effect]
      }
      return acc
    }, initial
  )
}

// initialize signal, false if no status, multiply if stacks,
function applyStatus(build, effect_or_mod) {
  const status = effect_or_mod.status
  if (status.inactive) return false
  const name = status.name
  const target = status.target
  const build_char = build[target]
  const stats = effect_or_mod.stats
  build_char.status[name] = null  // signal to initialize to 0 or maintain current value

  // max_[key] for interface if you get max_stacks...
  const max_stacks = (status.max_stacks === undefined)
    ? Math.floor(0.05 + (stats.duration/stats.interval)) // NaN, number
    : status.max_stacks  // let through max_stacks === 0

  if (!isNaN(max_stacks)) {
    const key = `max_${name}`
    build_char[key] = Math.max((build_char[key] || 0), (max_stacks || 0))

    if (!status.max_stacks) status.max_stacks = max_stacks // (passthrough if 0)
  }
  const min_stacks = status.min_stacks
  if (typeof min_stacks === 'number') {
    const key = `min_${name}`
    build_char[key] = min_stacks
    if (stats.count < min_stacks) stats.count = min_stacks
  }

  let status_value = (store[target].status[name] || 0) // undefined, boolean, number, ref?
  if (status_value < min_stacks) status_value = store[target].status[name] = min_stacks

  return !!status_value
}

function applyMetaMods(build, meta_mods) {
  const effect_mods = build.mods.effect
  let targets, target, target_stats, meta_stats
  for (let meta_mod of meta_mods) {
    targets = meta_mod.target // mod name
    targets = Array.isArray(targets) ? targets : [targets]
    for (target of targets) {
      target = filterObjects(effect_mods, { name: target })[0]
      if (!target) continue
      target_stats = target.stats
      meta_stats = meta_mod.stats
      for (let k in meta_stats) {
        switch (k) {
          case 'inactive':
          case 'stacks':
            target.status[k] = meta_stats[k]
            break
          case 'count':
            console.warn('Meta Mod w/ count:', meta_mod)
            break
          case 'min_stacks':
            target.status[k] = (target.status[k] || 0) + meta_stats[k]
            break
          case 'max_stacks':
            const tstatus = target.status
            const max = tstatus[k] = (tstatus[k] || 0) + meta_stats[k]
            const char = build[tstatus.target]
            const key = `max_${ tstatus.name }`
            char[key] = Math.max(char[key], max)
            break
          case 'reduction':
          case 'mult_base':
          case 'mult_min':
          case 'mult_max':
          case 'min':
          case 'max':
            const v = target_stats[k]
            target_stats[k] = (v || 0) + meta_stats[k]
            break
        }
      }
    }
  }
}

function applyCharacterMod(build_character, mod) {
  const mod_stats = mod.stats
  const build_stats = build_character.stats
  let k
  for (k in mod_stats) {
    switch (k) {
      case 'ammo_regen':
        if (!build_stats['Ammo Regen (Sec.)']) break
        build_stats['Ammo Regen (Sec.)'] += mod_stats[k]
        break
      case 'set_ammo_regen':
        build_stats['Ammo Regen (Sec.)'] = 6 - mod_stats[k]
        break
      case 'health_multiply':
        build_stats.health *= mod_stats[k]
        break
      case 'speed_projectile':
        build_stats['Projectile Speed'] = (build_stats['Projectile Speed'] || 1) + mod_stats[k]
        break
      case 'reduction': //
      case 'dodge':
        build_character[k] += mod_stats[k]
        break
      default:
        build_stats[k] = (build_stats[k] || 0) + mod_stats[k]
        break
    }
  }
}

function applyCoefficientMod(coefficients, mod) {
  const mod_stats = mod.stats
  for (let k in mod_stats) {
    switch (k) {
      case 'reduction':
        const cr = coefficients[k]
        const mr = mod_stats[k]
        coefficients[k] = cr + mr - (cr * mr)
        break
      case 'mult_base':
        const v = mod_stats[k]
        coefficients.mult_min += v
        coefficients.mult_max += v
        break
      default:
        coefficients[k] = (coefficients[k] || 0) + mod_stats[k]
        break
    }
  }
}

function applyEffectMod(effects, mod) {
  if (effects === undefined) return
  const mod_stats = mod.stats
  let k, effect_stats
  for (const effect of effects) {
    mod.god && (effect.god = mod.god)
    effect_stats = effect.stats

    for (k in mod_stats) {
      const mvalue = mod_stats[k]
      switch (k) {
        case 'triggers':
          effect.triggers = mod_stats[k]
          break
        case 'count':
          // cap local count to effect.status.max_stacks || 666
          effect_stats[k] = Math.min((effect.stats[k] || 0) + mvalue, ((effect.status && effect.status.max_stacks) || 666))
          break
        case 'stacks':
          effect.status[k] = mvalue
          break
        case 'max_stacks':
          console.warn('Effect mod with max_stacks!')
          effect.status[k] = (effect.status[k] || 0) + mvalue
          break
        case 'multiply_min':
          if (effect_stats.min)
            effect_stats.min *= mvalue
          break
        case 'multiply_max':
          if (effect_stats.max)
            effect_stats.max *= mvalue
          else if (effect_stats.min)
            effect_stats.max = effect_stats.min * mvalue
          break
        case 'multiply_base':
          effect_stats.min && (effect_stats.min *= mvalue)
          effect_stats.max && (effect_stats.max *= mvalue)
          break
        case 'multiply_duration':
          effect_stats.duration && (effect_stats.duration *= mvalue)
          break
        case 'div_duration':
          effect_stats.duration && (effect_stats.duration /= mvalue)
          break
        case 'multiply_radius':
          effect_stats.radius && (effect_stats.radius *= (1 + mvalue))
          break
        case 'name':
        case 'type':
          effect[k] = mvalue
          break
        case 'backstab':
        case 'dislodge':
        case 'lodge':
        case 'knockback':
          effect_stats[k] = mvalue
          break
        case 'set_min':
          effect_stats.min = mvalue
          break
        case 'min':
          if (!mod_stats.max) {
            const max = effect_stats.max
            if (max) effect_stats.max = max + mvalue
          }
        default:
          effect_stats[k] = (effect_stats[k] || 0) + mvalue
          break
      }
    }
  }
}

function applyEffectMods(build, mods) {
  let targets, target

  for (const mod of mods) {
    // stack status multiplier capped by mod's max_stacks
    const mstats = mod.stats
    const mstatus = mod.status
    const mmax = (mstatus && mstatus.max_stacks) || 666
    const mstacks = (mstatus && store[mstatus.target].status[mstatus.name]) || 1
    for (const key in mstats)
      if (typeof mstats[key] === 'number')
        mstats[key] *= Math.min(mmax, mstacks)

    targets = Array.isArray(mod.target)
      ? mod.target
      : [mod.target]

    const dir = build.directory
    for (target of targets) {
      switch(target) {
        case 'player':
          applyCharacterMod(build.player, mod)
          break
        case 'foe':
          applyCharacterMod(build.foe, mod)
          break
        case 'coefficients':
          applyCoefficientMod(build.coefficients, mod)
          break
        case 'attack':
          applyEffectMod(build.abilities.attack, mod)
          applyEffectMod(build.abilities.dashAttack, mod)
          if (mod.name === 'Punishing Sweep') break
        case 'chargeAttack':
          applyEffectMod(build.abilities.chargeAttack, mod)
          // applyEffectMod(dir.type['serpent'], mod)
          break

        case 'special':
          applyEffectMod(build.abilities.special, mod)
          applyEffectMod(build.abilities.dashSpecial, mod)
          applyEffectMod(build.abilities.chargeSpecial, mod)
          break
        case 'dash':
          applyEffectMod(build.abilities.dash, mod)
          break
        case 'dashAttack':
          applyEffectMod(build.abilities.dashAttack, mod)
          applyEffectMod(build.abilities.dashSpecial, mod)
          break
        case 'cast':
          applyEffectMod(build.abilities.cast, mod)
          break
        case 'call':
          applyEffectMod(build.abilities.call, mod)
          break
        default:
          applyEffectMod(dir.type[target] || dir.name[target], mod)
          break
      }
    }
  }
}


function linkEffects(build, effect_data, is_ability_data = false) {
  const b_effects = build.effects // by trigger

  for (let trigger in effect_data) {
    const effects = effect_data[trigger]

    for (let effect of effects) {
      // Toggle curses on the UI
      let secondary_effects

      // if ability, add the ability-triggered effects as well
      if (is_ability_data) {
        secondary_effects = b_effects[trigger]
        if (secondary_effects)
          effect.effects.push(...secondary_effects)

        if (trigger.indexOf('Attack') !== -1) {
          secondary_effects = b_effects.attack
          if (secondary_effects) effect.effects.push(...secondary_effects)
        }
        else if (trigger.indexOf('Special') !== -1) {
          secondary_effects = b_effects.special
          if (secondary_effects) effect.effects.push(...secondary_effects)
        }
      }

      // type
      secondary_effects = b_effects[effect.type]
      if (secondary_effects)
        effect.effects.push(...secondary_effects)

      // name
      secondary_effects = b_effects[effect.name]
      if (secondary_effects)
        effect.effects.push(...secondary_effects)

      // add triggers from stat names (e.g. backstab)
      const stats = effect.stats
      for (let k in stats) {
        if (!stats[k]) continue
        secondary_effects = b_effects[k]
        if (secondary_effects)
          effect.effects.push(...secondary_effects)
      }

      // 'triggers' prop to trigger another ability (hera -> cast)
      secondary_effects = build.abilities[effect.triggers]
      if (secondary_effects)
        effect.effects.push(...secondary_effects)

      computeDamageValues(build, effect)
    }
  }
}

function computeDamageValues(build, effect) {
  const stats = effect.stats
  if (stats.knockback) effect.slam = build.slam
  const min = stats.min
  if (min) {
    const max = stats.max || min
    const _co = build.coefficients
    const bs = foe.status.Backstab

    const base_multiplier = 1 + _co.mult_base + (stats.mult_base || 0)
      + ((bs && stats.backstab) ? (_co.backstab || 0) + (typeof stats.backstab === 'number' ? stats.backstab : 0): 0)

    const min_multiplier = base_multiplier + _co.mult_min + (stats.mult_min || 0) + ((bs && stats.backstab) ? _co.backstab_min : 0)
    const max_multiplier = base_multiplier + _co.mult_max + (stats.mult_max || 0) + ((bs && stats.backstab) ? _co.backstab_max : 0)
    const crit_stats = build.crit.stats
    const crit_mult_base = crit_stats.mult_base
    const crit_mult_min = crit_mult_base + (crit_stats.mult_min || 0)
    const crit_mult_max = crit_mult_base + (crit_stats.mult_max || 0)
    const damage_min = min * min_multiplier
    const damage_max = max * max_multiplier

    // ticks = total ticks over time, count = num stacks
    const count = (effect.type === 'doom') ? 1 : stats.count
    const interval = stats.interval
    if ('riftbeamvortexserpent'.indexOf(effect.type) !== -1) {
      effect.ticks = count || Math.floor(0.05 + (stats.duration / interval))
      if (effect.ticks) effect.stats.duration = effect.ticks * interval
      effect.damage_min = Math.round(damage_min)
      effect.damage_max = Math.round(damage_max)
      effect.dot_damage = (stats.vicious_cycle)
        ? Math.round((damage_min + Math.max(effect.ticks - 1, 0)) * effect.ticks)
        : Math.round(damage_min * effect.ticks)
    } else {
      if (interval) {
        effect.ticks = Math.floor(0.05 + (stats.duration / interval))
        effect.damage_min = Math.round(damage_min * (count || 1))
        effect.damage_max = Math.round(damage_max * (count || 1))
        effect.dot_damage = Math.round(damage_min * (count || 1) * effect.ticks)
      }
    }

    if (!effect.dot_damage) {
      const fh = foe.status['First Hit']
      const first_min_bonus = fh ? min * (_co.first + (stats.first || 0) + _co.first_min) : 0
      const first_max_bonus = fh ? max * (_co.first + (stats.first || 0) + _co.first_max) : 0
      effect.damage_min = Math.round((count || 1) * Math.round(damage_min + first_min_bonus))
      effect.damage_max = Math.round((count || 1) * Math.round(damage_max + first_max_bonus))
    }

    effect.damage = (effect.damage_min === effect.damage_max)
      ? `${ effect.damage_min }`
      : `${ effect.damage_min }-${ effect.damage_max }`


    effect.crit_chance = (no_crit.indexOf(effect.type) === -1)
      ? _co.crit + (stats.crit || 0) + (0.5 * (_co.crit_min + _co.crit_max))
      : 0

    if (effect.crit_chance) {
      effect.crit_min = Math.floor(effect.damage_min * crit_mult_min)
      effect.crit_max = Math.floor(effect.damage_max * crit_mult_max)
      effect.crit_damage = (effect.damage_min === effect.damage_max)
          ? `${ effect.crit_min }`
          : `${ effect.crit_min }-${ effect.crit_max }`

      const damage_avg = (effect.damage_min + effect.damage_max) / 2
      const crit_avg = (effect.crit_min + effect.crit_max) / 2
      effect.avg_damage = damage_avg + (effect.crit_chance * (crit_avg - damage_avg))
      if (interval) effect.avg_damage = effect.avg_damage * effect.ticks
      effect.avg_damage = Math.round(effect.avg_damage)
    }
  }
}

// e.g. target: store.player, source: build.player
function syncObjectChanges(target, source) {
  let key
  for (key in source) {
    const svalue = source[key]
    const tvalue = target[key]

    // null is object, have to check for object on target
    if (typeof tvalue === 'object') {
      syncObjectChanges(tvalue, svalue)
    } else if (svalue === null) {
      if (tvalue === undefined) target[key] = 0
      else continue
    } else if (tvalue !== svalue) {
      target[key] = svalue
    }
  }
  for (key in target) {
    if (source[key] === undefined)
      delete target[key]
  }
}

let stopWatch = () => null
function compileBuild() {
  stopWatch()
  const _data = data
  const crit = Object.create(_data.crit)
  crit.stats = { ...crit.stats }
  crit.effects = []
  const slam = Object.create(_data.slam)
  slam.stats = {...slam.stats }
  slam.effects = []

  const build = {
    player: copyEffect(_data.player),
    foe: copyEffect(_data.foe),
    coefficients: { ..._data.coefficients },
    crit,
    slam,
    gods: {},
    abilities: {
      dash: [{name: "Dash", type: 'ability', trigger: 'dash', stats: {}, effects: []}],
      revenge: [{name: "Damage Taken", type: 'event', trigger: 'revenge', stats: {}, effects: []}],
      slain: [{name: "Enemy Death", type: 'event', trigger: 'slain', stats: {}, effects: []}],
    },
    mods: {
      meta: [],
      effect: [],
    },
    effects: {
      lodge: [{name: 'Dislodge', type: 'dislodge', trigger: 'lodge', stats: {duration: 15}, effects: []}],
    },
    features: [],
    include: {},
    exclude: { base: true },
  }

  for (const trait_list of [
    [ store.weapon ],
    filterObjects(traits, { type: 'cast' }),
    filterObjects(traits, { type: 'aspect' }),
    filterObjects(traits, { type: 'hammer' }),
    filterObjects(traits, { type: 'attack|special|dash|call|keepsake' }),
    filterObjects(traits, { type: 'primary' }),
    filterObjects(traits, { type: 'secondary' }),
  ]) {
    for (const trait of trait_list) {
      // Copy the properties we need from the data, overwrite abilities
      extractTrait(trait, build)
    }
  }

  const _mirror = mirror // store.mirror
  const data_mirror = data.mirror
  for (const key in _mirror) {
    const talent = _mirror[key]
    const selection = talent.selection
    if (selection) {
      const mod = copyEffect(data_mirror[key][selection - 1])
      const stats = mod.stats
      for (const k in stats) stats[k] *= talent.rank

      if (key === 'privilege') {
        if (selection === 1) {
          // Privileged Status
          const inactive = (Object.keys(foe.status).reduce((n, k) => n + ((foe.status[k] && status_curses.indexOf(k) !== -1 && build.foe.status[k] !== undefined) ? 1 : 0), 0) < 2)
          build.foe.privilege = !inactive
          if (inactive) continue
        } else {
          // Family Favorite
          stats.mult_base *= Object.keys(build.gods).reduce((n, k) => n + ((gods.indexOf(k) !== -1) ? 1 : 0), 0)
        }
      }

      if (mod.status && !applyStatus(build, mod)) continue
      build.mods.effect.unshift(mod)
    }
  }

  const casts = copyEffect(_data.casts)
  applyStatus(build, casts)
  build.mods.effect.push(casts)

  if (player.status.Sturdy) {
    build.mods.effect.push(_data.sturdy)
  }
  if (build.foe.status.Weak !== undefined && foe.status.Weak) {
    build.mods.effect.push(copyEffect(_data.weak))
  }
  if (build.foe.status.Chill !== undefined) {
    const effect = copyEffect(_data.chill)
    if (applyStatus(build, effect)) {
      build.mods.effect.push(effect)
    }
  }
  if (build.foe.status.Hangover !== undefined) {
    const effect = copyEffect(_data.hangover)
    if (applyStatus(build, effect))
      build.mods.effect.push(effect)
  }

  // build effects_by_type index for mod application
  // build.effects[trigger] = [ effect, ... ]
  build.directory = createDirectories(build.effects,
    createDirectories(build.abilities,
      { type: {crit: [crit], slam: [slam] }, name: { Crit: [crit], Slam: [slam] }}
    ))

  // Modify the abilities and effects
  applyMetaMods(build, build.mods.meta)
  applyEffectMods(build, build.mods.effect)

  // Hermes - Rush Delivery damage_from_speed
  if (build.coefficients.damage_from_speed) {
    build.coefficients.mult_base += (build.player.stats.speed * build.coefficients.damage_from_speed)
  }

  // Link and Calculate
  linkEffects(build, build.abilities, true)
  linkEffects(build, build.effects)

  // Cap any status stacks
  for (const key in player.status) {
    const max = build.player[`max_${key}`]
    if (max && max < player.status[key]) player.status[key] = max
  }
  for (const key in foe.status) {
    const max = build.foe[`max_${key}`]
    if (max && max < foe.status[key]) foe.status[key] = max
  }

  // Sync include/exclude
  syncObjectChanges(include, build.include)
  syncObjectChanges(exclude, build.exclude)

  // Update dynamic character stats
  build.player.stats.dodge += (build.coefficients.dodge + build.foe.dodge + build.player.dodge)
  build.player.stats.reduction += (build.coefficients.reduction + build.foe.reduction + build.player.dodge)
  syncObjectChanges(player, build.player)
  syncObjectChanges(foe, build.foe)

  // Set max casts to ammo
  foe['max_Casts'] = build.player.stats.ammo

  window.location.hash = genHash(store)
  stopWatch = watch([store.mirror, store.traits, store.player.status, store.foe.status],
    () => { store.build = compileBuild() },
    { deep: true }
  )
  return build
}


function filterTraits(props) {
  const result = []
  let trait, name
  traitLoop:
  for (trait of trait_data) {
    name = trait.name
    if (exclude[name]) continue
    for (let k in props) {
      const trait_value = trait[k]
      const props_value = props[k]
      if (Array.isArray(trait_value)) {
        if (trait_value.reduce((acc, v) => acc && (props_value.indexOf(v) === -1), true))
          continue traitLoop
      } else if (props_value.indexOf(trait[k]) === -1) {
        continue traitLoop
      }
    }
    result.push(wrapTrait(trait))
  }
  return result
}

function genHash(store) {
  const traits = store.traits
  const out = []
  for (const k in mirror) {
    const ability = mirror[k]
    out.push(formatValue((ability.selection) ? (18 * (ability.selection - 1)) + ability.rank : 0))
  }
  out.push(store.weapon.id)
  for (const trait of traits) {
    out.push(trait.id)
    if (typeof trait.level === 'number') out.push(Math.min(35, trait.level).toString(36))
    if (trait.rarity > -1 && trait.rarity < 5) out.push(Math.min(35, trait.rarity).toString(36))
  }
  return out.join('')
}

function applyHash(store, selectTrait) {
  const hash = window.location.hash.substr(1)
  if (!hash) return

  let i = 0
  // mirror :: 0:12
  for (const k in mirror) {
    const ability = mirror[k]
    const input = parseInt(hash.slice(i++,i), 36)
    ability.selection = (input > 18) ? 2 : ((input > 0) ? 1 : 0)
    ability.rank = Math.max(1, (input % 18))
  }

  store.weapon = selectTrait({ id: hash.slice(i,(i+=2)) })
  const traits = []
  let t, l, r
  console.log(i)
  while (i < hash.length) {
    // two characters for trait
    console.log(hash.slice(i,i+2))
    t = selectTrait({ id: hash.slice(i,(i+=2)) })
    console.log(t)
    l = r = null
    const lv = t.level
    if (typeof lv === 'number') {
      t.level = parseInt(hash.slice(i++,i), 36)
    }
    const rv = t.rarity
    if (rv > -1 && rv < 5) {
      t.rarity = parseInt(hash.slice(i++,i), 36)
    }
    traits.push(t)
  }
  store.traits = traits
}

window.store = store

applyHash(store, selectTrait)
store.build = compileBuild()
store.genHash = genHash
store.selectTrait = selectTrait
store.filterTraits = filterTraits

export const useStore = () => store
export default useStore
