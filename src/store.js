import { reactive, watch, ref, computed } from 'vue'
import { data } from './data/index.js'

const status_curses = [ 'jolted', 'hangover', 'weak' ]

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
  const target = effect.status || effect.stats || {}
  const pom = (level && effect.pom)
    ? effect.pom
    : _pom

  return Object.keys(target).reduce((extracted, k) => {
    const v = target[k]
    extracted[k] = (Array.isArray(v))
      ? v[rarity] + pom(level, v[0])
      : (typeof v === 'number')
        ? v + pom(level, v)
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

let triggers = {}

function extractTraitData(data, buildData, rarity, level, overwrite) {
  if (data === undefined) return  // data = abilties[] / effects[] / mods[]

  const extracted = data.reduce((acc, v) => {
    const type = v.type
    const effect = Object.create(v)
    const trigger = v.trigger
    if (trigger) triggers[trigger]
      ? triggers[trigger].push(effect)
      : triggers[trigger] = [effect]
    effect.stats = extractStats(v, rarity, level)
    effect.effects = []
    if (acc[type] === undefined) acc[type] = [effect]
    else acc[type].push(effect)
    return acc
  }, {})

  for (let k in extracted) {
    buildData[k] = ((buildData[k] === undefined) || overwrite)
      ? extracted[k]
      : [ ...buildData[k], ...extracted[k] ]
  }
}

function extractTrait(trait, build) {
  const level = trait.level
  const rarity = trait.rarity

  // register inclusions/exclusions
  build.include[trait.name] = true
  if (trait.type !== 'weapon')
    build.exclude[trait.name] = true
  const exclude = trait.exclude
  exclude && exclude.reduce((a, v) => {
    build.exclude[v] = true
  })

  trait.god && (build.gods[trait.god] = true)

  // extract stats data
  extractTraitData(trait.abilities, build.abilities, rarity, level, true)
  extractTraitData(trait.effects, build.effects, rarity, level)
  extractTraitData(trait.mods, build.mods, rarity, level)
}

function applyCharacterMod(store_character, build_character, mod) {
  if (mod.status) {
    // This is e.g. how shadow presence works
    build_character.status[mod.name] = null
    if (!store_character.status[mod.name]) return
  }

  const mod_stats = mod.stats
  const build_stats = build_character.stats

  let k
  for (k in mod_stats) {
    switch (k) {
      case 'reduction':
        const cr = build_character[k]
        const mr = mod_stats[k]
        build_character[k] = cr + mr - (cr * mr)
        break

      case 'mult_min':
      case 'mult_max':
      case 'backstab':
        build_character[k] += mod_stats[k]
        break

      case 'multiplier':
        const v = mod_stats[k]
        build_character.mult_min += v
        build_character.mult_max += v

      case 'speed':
        build_stats[k] += mod_stats[k]
        break
      case 'health_add':
        build_stats.health += mod_stats[k]
        break
      case 'health_multiply':
        build_stats.health *= mod_stats[k]
        break
    }
  }
}

function applyCoefficientMod(coefficients, mod) {
  const mod_stats = mod.stats
  for (let k in mod_stats) {
    coefficients[k] += mod_stats[k]
  }
}

function applyAbilityMod(effect, mod) {
  const mod_stats = mod.stats
  const effect_stats = effect.stats
  let k
  for (k in mod_stats) {
    switch (k) {
      case 'backstab':
      case 'dislodge':
      case 'lodge':
      case 'knockback':
        effect_stats[k] = mod_stats[k]
        break
      case 'min':
      case 'max':
      case 'mult_min':
      case 'mult_max':
      case 'crit':
      case 'first':
      case 'speed':
      case 'duration':
      case 'range':
        effect_stats[k] = (effect_stats[k])
          ? effect_stats[k] + mod_stats[k]
          : mod_stats[k]
        break
      case 'chargeAttack':
      case 'chargeSpecial':
      default:
        break
    }
  }
}

function applyEffectMod(effect, mod) {
  const mod_stats = mod.stats
  const effect_stats = effect.stats
  let k
  for (k in mod_stats) {
    switch (k) {
      default:
        effect_stats[k] += mod_stats[k]
        break
    }
  }
}

function applyMetaMods(build, meta_mods) {
  const stat_mods = build.mods.stat
  let name, target, target_stats, meta_stats
  for (let meta_mod of meta_mods) {
    name = meta_mod.target // mod name
    target = filterObjects(stat_mods, { name: name })[0]
    if (!target) continue
    target_stats = target.stats
    meta_stats = meta_mod.stats
    for (let k in meta_stats) {
      switch (k) {
        case 'reduction':
        case 'multiplier':
        case 'mult_min':
        case 'mult_max':
          const v = target_stats[k]
          target_stats[k] = (v)
            ? v + meta_stats[k]
            : meta_stats[k]
          break
      }
    }
  }
}

function applyStatMods(build, mods) {
  for (const mod of mods) {
    const target = mod.target
    switch(target) {
      case 'player':
        applyCharacterMod(player, build.player, mod)
        break
      case 'foe':
        applyCharacterMod(foe, build.foe, mod)
        break
      case 'coefficients':
        applyCoefficientMod(build.coefficients, mod)
        break
      case 'attack':
      case 'special':
      case 'dash':
      case 'cast':
      case 'call':
        const target_abilities = build.abilities[target]
        if (target_abilities === undefined) return
        for (const effect of target_abilities)
          applyAbilityMod(effect, mod)
        break
      default:
        const target_effects = build.effects[target]
        if (target_effects === undefined) return
        for (const effect of target_effects)
          applyEffectMod(effect, mod)
        break
    }
  }
}

function buildEffects(build, data) {
  const build_player = build.player
  const build_foe = build.foe
  const _triggers = triggers
  for (let key in data) {
    const effects = data[key]
    if (!effects) continue // Abilities may have been overwritten
    for (let effect of effects) {
      const type = effect.type
      // Toggle curses on the UI
      if (status_curses.indexOf(type) !== -1)
        build_foe.status[type] = null

      // check what the type triggers
      let target_effects = _triggers[type]
      if (target_effects)
        effect.effects.push(...target_effects)

      // add triggers from stat names (e.g. backstab)
      const stats = effect.stats
      for (let k in stats) {
        target_effects = _triggers[k]
        if (target_effects)
          effect.effects.push(...target_effects)
      }

      const min = stats.min
      if (min) {
        const max = stats.max || min
        const coefficients = build.coefficients
        const base_multiplier = 1 + coefficients.multiplier
          + (player.status.Backstab ? coefficients.backstab : 0)
          + (foe.status.undamaged ? coefficients.first + (stats.first || 0) : 0)
        const min_multiplier = base_multiplier + coefficients.mult_min + (stats.mult_min || 0)
        const max_multiplier = base_multiplier + coefficients.mult_max + (stats.mult_max || 0)
        const crit_multiplier = build.effects.crit[0].stats.multiplier
        // TODO: crit min and crit max ?

        effect.damage_min = min * min_multiplier
        effect.damage_max = max * max_multiplier
        effect.damage = (effect.damage_min === effect.damage_max)
          ? `${ Math.round(effect.damage_min) }`
          : `${ Math.round(effect.damage_min) }-${ Math.round(effect.damage_max) }`
        effect.crit_chance = coefficients.crit + (stats.crit || 0)
        effect.crit_min = effect.damage_min * crit_multiplier
        effect.crit_max = effect.damage_max * crit_multiplier
        effect.crit_damage = (effect.damage_min === effect.damage_max)
            ? `${ Math.round(effect.crit_min) }`
            : `${ Math.round(effect.crit_min) }-${ Math.round(effect.crit_max) }`

        const damage_avg = (effect.damage_min + effect.damage_max) / 2
        const crit_avg = (effect.crit_min + effect.crit_max) / 2
        effect.avg_damage = Math.round(damage_avg + (effect.crit_chance * (crit_avg - damage_avg)))
      }
    }
  }
}
// e.g. target: store.player, source: build.player
function syncObjectChanges(target, source) {
  let key
  for (key in source) {
    const svalue = source[key]
    const tvalue = target[key]
    if (typeof tvalue === 'object') syncObjectChanges(tvalue, svalue)
    else if (svalue === null) {
      if (tvalue === undefined) target[key] = false
      else continue
    }
    else if (tvalue !== svalue) target[key] = svalue
  }
  for (key in target) {
    if (source[key] === undefined) delete target[key]
  }
}

// const mod_types = ['ability', 'reduction', 'base', 'percent', 'effect']
const mod_types = ['meta', 'stat']
function compileBuild() {
  const crit = Object.create(data.base.crit)
  crit.stats = { ...crit.stats }
  crit.effects = []
  triggers = {}
  const data_base = data.base

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
    abilities: {
      revenge: [{name: "Revenge", type: 'revenge', stats: {}, effects: []}],
      slain: [{name: "Enemy Slain", type: 'slain', stats: {}, effects: []}],
    },
    mods: {
      meta: [],
      stat: [],
    },
    effects: { crit: [ crit ] },
    gods: {},
    include: {},
    exclude: {},
  }

  if (foe.status.weak) {
    const weak = data_base.weak
    build.mods.stat.push({...weak, stats: { ...weak.stats }})
  }
  if (player.status['Shadow Presence']) {
    const shadow = data_base.shadow
    build.mods.stat.push(shadow)
  }

  for (const trait_list of [
    [ store.weapon ],
    filterObjects(traits, { type: 'aspect' }),
    filterObjects(traits, { type: 'hammer' }),
    filterObjects(traits, { type: 'attack|special|dash|cast|call|keepsake' }),
    filterObjects(traits, { type: 'primary' }),
    filterObjects(traits, { type: 'secondary' }),
  ]) {
    for (const trait of trait_list) {
      // Copy the properties we need from the data, overwrite abilities
      extractTrait(trait, build)
    }
  }

  // Modify the abilities and effects
  applyMetaMods(build, build.mods.meta)
  applyStatMods(build, build.mods.stat)
  // for (const mod_type of mod_types) {
  //   const mods = build.mods[mod_type] // Effect[] || undefined
  //   if (mods === undefined) continue
  //   applyMods(build, mods, mod_type)
  // }

  // Populate the effect arrays
  // linkEffects(build, build.abilities)
  // linkEffects(build, build.effects)

  // LINK AND CALCULATE
  buildEffects(build, build.abilities)
  buildEffects(build, build.effects)


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
      if (props[k].indexOf(trait[k]) === -1) {
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
