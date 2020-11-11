import { reactive, watch, ref, computed } from 'vue'
import { data } from './data/index.js'

const status_curses = [ 'jolted', 'hangover', 'weak', 'marked' ]

const include = reactive({})
const exclude = reactive({})
const watchPrereqs = (prereqs) =>
  prereqs.reduce((a, v) => {
    a[v] = computed(() => include[v] ? true : false)
    return a
  }, {})


// Make trait data reactive and add inclusion/exlusion properties
const trait_data = data.traits.map((t) => {
  const trait = reactive(t)
  const prereqs = t.prereqs
  // trait.prereqs = (prereqs)
  //   ? Array.isArray(prereqs)
  //     ? watchPrereqs(prereqs)
  //     : Object.keys(prereqs).reduce((a, v) => {
  //       a[v] = watchPrereqs(prereqs[v])
  //       return a
  //     }, {})
  //   : null
  trait.prereqs = (prereqs)
    ? Object.keys(prereqs).reduce((p, k) => {
        p[k] = watchPrereqs(prereqs[k])
        return p
      }, {})
    : null

  trait.active = computed(() => {
    // if (exclude[trait.name]) return false
    if (prereqs) {
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
    }
    return true
  })

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
    watch([r, l], () => d.value = td(getStatsContext(t)), { immediate: true })
  }

  return t
}

const effect_categories = ['abilities', 'effects', 'mods']
function getStatsContext(trait) {
  const stats = {}
  for (let key of effect_categories) {
    let effects = trait[key]
    if (effects === undefined) continue

    for (let effect of effects) {
      Object.assign(stats, extractStats(effect, trait.rarity, trait.level))
    }
  }
  return stats
}

function _pom() { return 0 }
function extractStats (effect, rarity, level) {
  const target = effect.stats || {}
  const pom = (level && effect.pom)
    ? effect.pom
    : _pom

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
  ...data.base.player,
  stats: { ...data.base.player.stats },
  status: { ...data.base.player.status },
})

const foe = reactive({
  ...data.base.foe,
  stats: { ...data.base.foe.stats },
  status: { ...data.base.foe.status },
})

const traits = reactive([
  data.base.attack,
  data.base.special,
  data.base.cast,
  data.base.dash,
  data.base.call,
  data.base.keepsake,
  selectTrait({ weapon: 'Stygius', name: 'Stygius - Aspect of Zagreus' }),
])

const store = reactive({
  base: data.base,
  placeholder: data.placeholder,
  hover: null,
  selected: null,
  traits,
  weapon: selectTrait({ name: 'Stygius' }),
  player,
  foe,
})


function extractTraitData(build, trait_data, build_data, rarity, level, overwrite) {
  if (trait_data === undefined) return  // trait_data = abilties[] / effects[] / mods[]

  const extracted = trait_data.reduce((acc, v) => {
    const key = v.trigger || v.type
    if (v.type === null) {
      acc[key] = null
      return acc
    }
    const effect = Object.create(v)
    effect.stats = extractStats(v, rarity, level)
    effect.status = (effect.status) ? Object.create(effect.status) : null

    effect.effects = []
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
  if (trait.type !== 'weapon' && trait.god !== 'Chaos')
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
    build.features.push(trait.feature(getStatsContext(trait)))

  // extract stats data
  extractTraitData(build, trait.abilities, build.abilities, rarity, level, true)
  extractTraitData(build, trait.effects, build.effects, rarity, level)
  extractTraitData(build, trait.mods, build.mods, rarity, level)
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
function applyStatus(build, effect_or_mod, status) {
  const name = status.name
  const target = status.target
  const build_char = build[target]
  build_char.status[name] = null  // signal to initialize to 0 or maintain current value

  const stacks = status.stacks
  if (typeof stacks === 'number') {
    build_char[`max_${name}`] = stacks
  }

  const status_value = store[target].status[name] || 0
  if (!status_value) return false

  if (effect_or_mod.stacks) {
    const stats = effect_or_mod.stats
    for (const key in stats) {
      stats[key] *= status_value
    }
  }

  return true
}

function applyMetaMods(build, meta_mods) {
  const effect_mods = build.mods.effect
  let targets, target, target_stats, meta_stats
  for (let meta_mod of meta_mods) {

    const status = meta_mod.status
    if (status)
      if (!applyStatus(build, meta_mod, status)) continue
    // if (status) {
    //   const status_value = store[status.target].status[status.name]
    //   if (!status_value) continue
      // if (meta_mod.stacks) {
      //   const stats = meta_mod.stats
      //   for (const key in stats) {
      //     stats[key] *= status_value
      //   }
      // }
    // }

    targets = meta_mod.target // mod name
    targets = Array.isArray(targets) ? targets : [targets]
    for (target of targets) {
      target = filterObjects(effect_mods, { name: target })[0]
      if (!target) continue
      target_stats = target.stats
      meta_stats = meta_mod.stats
      for (let k in meta_stats) {
        switch (k) {
          case 'reduction':
          case 'mult_base':
          case 'mult_min':
          case 'mult_max':
            const v = target_stats[k]
            target_stats[k] = (v || 0) + meta_stats[k]
            break
          case 'min':
          case 'max':
            target_stats[k] = meta_stats[k]
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
      case 'health_multiply':
        build_stats.health *= mod_stats[k]
        break
      case 'speed_projectile':
        build_stats['Projectile Speed'] = (build_stats['Projectile Speed'] || 1) + mod_stats[k]
        break
      default:
        build_stats[k] += mod_stats[k]
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
        coefficients[k] += mod_stats[k]
        break
    }
  }
}

function applyEffectMod(effects, mod) {
  if (effects === undefined) return
  const mod_stats = mod.stats
  let k, effect_stats
  for (const effect of effects) {
    effect_stats = effect.stats
    for (k in mod_stats) {
      switch (k) {
        case 'multiply_min':
          if (effect_stats.min)
            effect_stats.min *= mod_stats[k]
          break
        case 'multiply_max':
          if (effect_stats.max)
            effect_stats.max *= mod_stats[k]
          else if (effect_stats.min)
            effect_stats.max = effect_stats.min * mod_stats[k]
          break
        case 'multiply_base':
          effect_stats.min && (effect_stats.min *= mod_stats[k])
          effect_stats.max && (effect_stats.max *= mod_stats[k])
          break
        case 'multiply_duration':
          effect_stats.duration && (effect_stats.duration *= mod_stats[k])
          break
        case 'name':
        case 'type':
          effect[k] = mod_stats[k]
          break
        case 'knockback':
        case 'backstab':
        case 'dislodge':
        case 'lodge':
        case 'knockback':
          effect_stats[k] = mod_stats[k]
          break
        case 'stacks':
          effect.status[k] = (effect.status[k] || 0) + mod_stats[k]
          break
        default:
          effect_stats[k] = (effect_stats[k] || 0) + mod_stats[k]
          break
      }
    }
  }
}

function applyEffectMods(build, mods) {
  let targets, target

  for (const mod of mods) {
    targets = Array.isArray(mod.target)
      ? mod.target
      : [mod.target]

    const status = mod.status
    if (status)
      if (!applyStatus(build, mod, status)) continue

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
          const dir = build.directory
          applyEffectMod(dir.type[target] || dir.name[target], mod)
          break
      }
    }
  }
}

// effect_data = build.abilities, build.effects = { trigger: [ effect, ... ] }
// > effect directories indexed by trigger
// 1. Build type directory
// 2. For each effect
  // 3.
function linkEffects(build, effect_data, is_ability_data = false) {
  const b_effects = build.effects // by trigger

  for (let trigger in effect_data) {
    const effects = effect_data[trigger]
    // if (!effects) continue // Abilities may have been overwritten

    for (let effect of effects) {
      const status = effect.status
      if (status)
        applyStatus(build, effect, status)
      // Toggle curses on the UI
      const type = effect.type
      let secondary_effects

      // add triggers from stat names (e.g. backstab)
      const stats = effect.stats
      for (let k in stats) {
        secondary_effects = b_effects[k]
        if (secondary_effects)
          effect.effects.push(...secondary_effects)
      }

      // if ability, add the ability-triggered effects as well
      if (is_ability_data) {
        secondary_effects = b_effects[trigger]
        if (secondary_effects)
          effect.effects.push(...secondary_effects)
      }

      // check what the type triggers
      secondary_effects = b_effects[type]
      if (secondary_effects)
        effect.effects.push(...secondary_effects)

      computeDamageValues(build, effect)
    }
  }
  // computeDamageValues(build, build.slam)
}

function computeDamageValues(build, effect) {
  const stats = effect.stats
  if (stats.knockback) effect.slam = build.slam
  const min = stats.min
  if (min) {
    const max = stats.max || min
    const coefficients = build.coefficients
    // const backstab_mult = + ((stats.backstab && player.status.Backstab) ? (stats.mult_backstab || 1) * ((coefficients.backstab || 0) + (typeof stats.backstab === 'number' ? stats.backstab : 0)): 0)
    const base_multiplier = 1 + coefficients.mult_base + (stats.mult_base || 0)
      + ((stats.backstab && player.status.Backstab) ? (coefficients.backstab || 0) + (typeof stats.backstab === 'number' ? stats.backstab : 0): 0)
      + (foe.status.Undamaged ? coefficients.first + (stats.first || 0) : 0)
    const min_multiplier = base_multiplier + coefficients.mult_min + (stats.mult_min || 0)
    const max_multiplier = base_multiplier + coefficients.mult_max + (stats.mult_max || 0)
    const crit_stats = build.crit.stats
    const crit_mult_base = crit_stats.mult_base
    const crit_mult_min = crit_mult_base + (crit_stats.mult_min || 0)
    const crit_mult_max = crit_mult_base + (crit_stats.mult_max || 0)

    effect.damage_min = Math.round(min * min_multiplier)
    effect.damage_max = Math.round(max * max_multiplier)
    effect.damage = (effect.damage_min === effect.damage_max)
      ? `${ effect.damage_min }`
      : `${ effect.damage_min }-${ effect.damage_max }`

    const interval = stats.interval
    if (interval) {
      effect.dot_ticks = Math.floor(0.05 + (stats.duration / interval))
      effect.dot_damage = effect.damage_min * effect.dot_ticks
      // effect.dot_damage = (effect.avg_damage || effect.damage_min) * Math.round(stats.duration / interval)
    }

    effect.crit_chance = coefficients.crit + (stats.crit || 0) + (0.5 * (coefficients.crit_min + coefficients.crit_max))

    if (effect.crit_chance) {
      effect.crit_min = effect.damage_min * crit_mult_min
      effect.crit_max = effect.damage_max * crit_mult_max
      effect.crit_damage = (effect.damage_min === effect.damage_max)
          ? `${ Math.round(effect.crit_min) }`
          : `${ Math.round(effect.crit_min) }-${ Math.round(effect.crit_max) }`

      const damage_avg = (effect.damage_min + effect.damage_max) / 2
      const crit_avg = (effect.crit_min + effect.crit_max) / 2
      effect.avg_damage = damage_avg + (effect.crit_chance * (crit_avg - damage_avg))
      if (interval) effect.avg_damage = effect.avg_damage * effect.dot_ticks
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
    if (source[key] === undefined) delete target[key]
  }
}

// const mod_types = ['ability', 'reduction', 'base', 'percent', 'effect']
const mod_types = ['meta', 'effect']
function compileBuild() {
  const data_base = data.base
  const crit = Object.create(data_base.crit)
  crit.stats = { ...crit.stats }
  crit.effects = []
  const slam = Object.create(data_base.slam)
  slam.stats = {...slam.stats }
  slam.effects = []

  const build = {
    player: {
      ...data_base.player,
      stats: { ...data_base.player.stats },
      status: { ...data_base.player.status },
    },
    foe: {
      ...data_base.foe,
      stats: { ...data_base.foe.stats },
      status: { ...data_base.foe.status },
    },
    coefficients: { ...data_base.coefficients },
    crit,
    slam,
    gods: {},
    abilities: {
      dash: [{name: "Dash", type: 'ability', trigger: 'dash', stats: { range: 350, count: 2 }, effects: []}],
      revenge: [{name: "Damage Taken", type: 'event', trigger: 'revenge', stats: {}, effects: []}],
      slain: [{name: "Enemy Death", type: 'event', trigger: 'slain', stats: {}, effects: []}],
    },
    mods: {
      meta: [],
      effect: [data_base.shadow],
    },
    effects: {
      // knockback: [{...data_base.slam, stats: {...data_base.slam.stats}, effects: []}],
      lodge: [{name: 'Dislodge', type: 'dislodge', stats: {duration: 15}, effects: []}],
    },
    features: [],
    include: {},
    exclude: {},
  }

  if (foe.status.weak) {
    const weak = data_base.weak
    build.mods.effect.push({...weak, stats: { ...weak.stats }})
  }
  if (foe.status.chill) {
    const chill = data_base.chill
    build.mods.effect.push({...chill, stats: { ...chill.stats }})
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

  // build effects_by_type index for mod application
  // build.effects[trigger] = [ effect, ... ]
  build.directory = createDirectories(build.effects,
    createDirectories(build.abilities,
      { type: {crit: [crit], slam: [slam]}, name: { Crit: [crit], Slam: [slam] }}
    ))

  // Modify the abilities and effects
  applyMetaMods(build, build.mods.meta)
  applyEffectMods(build, build.mods.effect)

  // Link and Calculate
  linkEffects(build, build.abilities, true)
  linkEffects(build, build.effects)

  // Sync include/exclude
  syncObjectChanges(include, build.include)
  syncObjectChanges(exclude, build.exclude)

  // Update dynamic character stats
  build.player.stats.reduction = build.coefficients.reduction
  syncObjectChanges(player, build.player)
  syncObjectChanges(foe, build.foe)

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
      //
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

window.trait_data = trait_data
window.store = store
store.build = compileBuild()
store.filterTraits = filterTraits

watch([store.traits, store.player.status, store.foe.status],
  () => { store.build = compileBuild() },
  { deep: true }
)

export const useStore = () => store
export default useStore
