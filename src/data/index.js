import aphrodite from './aphrodite'
import ares from './ares'
import artemis from './artemis'
import athena from './athena'
import coronacht from './coronacht'
import chaos from './chaos'
import demeter from './demeter'
import dionysus from './dionysus'
import exagryph from './exagryph'
import hermes from './hermes'
import malphon from './malphon'
import poseidon from './poseidon'
import stygius from './stygius'
import varatha from './varatha'
import aegis from './aegis'
import zeus from './zeus'
import duo from './duo'

/*
rarity:
-4: weapon
-3: hammer
-2: keepsake
-1: base
0: common
1: rare
2: epic
3: heroic
4: legendary
5: duo
*/

export function copyEffect(effect) {
  return {
    ...effect,
    stats: { ...effect.stats },
    status: (effect.status ? { ...effect.status } : undefined)
  }
}

export const data =
{
  placeholder : {
    type: 'placeholder',
  },

  base : {
    attack: {
      name: 'base',
      type: 'attack',
      icon: 'assets/traits/SlotIcon_Attack.png',
      rarity: -1,
    },

    special: {
      name: 'base',
      type: 'special',
      icon: 'assets/traits/SlotIcon_Secondary.png',
      rarity: -1,
    },

    cast: {
      name: 'base',
      type: 'cast',
      icon: 'assets/traits/SlotIcon_Ranged.png',
      rarity: -1,
      abilities: [
        { name: 'Cast', type: 'damage', trigger: 'cast', stats: { min: 50, lodge: true } },
      ],
    },

    dash: {
      name: 'base',
      type: 'dash',
      icon: 'assets/traits/SlotIcon_Dash.png',
      rarity: -1,
    },

    call: {
      name: 'base',
      type: 'call',
      icon: 'assets/traits/SlotIcon_Wrath.png',
      rarity: -1,
    },

    keepsake: {
      name: 'base',
      type: 'keepsake',
      rarity: -2,
    },

    privileged: {
      name: 'Privileged Status',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_base: 0.4 },
    },

    shadow: {
      name: 'Shadow Presence',
      type: 'effect',
      target: 'coefficients',
      stats: { backstab: 0.5 },
      status: { target: 'player', name: 'Shadow Presence' },
    },

    fiery: {
      name: 'Fiery Presence',
      type: 'effect',
      target: 'coefficients',
      stats: { first: 0.15 },
      status: { target: 'player', name: 'Fiery Presence' },
    },

    sturdy: {
      name: 'Sturdy',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: 0.3 },
      status: { target: 'player', name: 'Sturdy' },
    },

    crit: {
      name: 'Crit',
      type: 'damage',
      trigger: 'crit',
      stats: {
        mult_base: 3,
      },
    },

    chill: {
      name: 'Chill',
      type: 'effect',
      target: 'foe',
      stats: { speed: -0.04 },
      status: { name: 'Chill', target: 'foe', max_stacks: 10 },
    },

    weak: {
      name: 'Weak',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: 0.3 }
    },

    hangover: {
      name: 'Hangover Stacks',
      type: 'effect',
      target: 'hangover',
      stats: { count: 1 },
      status: { name: 'Hangover', target: 'foe', max_stacks: 5 },
    },

    slam: {
      name: 'Slam',
      type: 'slam',
      trigger: 'knockback',
      stats: { mult_base: 1 },
    },

    player: {
      name: 'Zagreus',
      dodge: 0,
      reduction: 0,
      stats: {
        health: 50,
        dodge: 0,
        reduction: 0,
        speed: 1,
        dashes: 1,
        ammo: 1,
        'Ammo Regen (Sec.)': 5,
      },
      status: {
        // 'Fiery Presence': null,
        // 'Shadow Presence': null,
        // 'Privileged Status': null,
      },
    },

    foe: {
      name: 'Foe',
      reduction: 0,
      dodge: 0,
      stats: {
        health: 100,
        speed: 1,
      },
      status: {
        'First Hit': null,
        'Backstab': null,
      },
    },

    coefficients: {
      mult_base: 0,
      mult_min: 0,
      mult_max: 0,
      first: 0,
      first_min: 0,
      first_max: 0,
      backstab: 0,
      backstab_min: 0,
      backstab_max: 0,
      crit: 0,  // Chance
      crit_min: 0,  // Chance
      crit_max: 0,  // Chance
      reduction: 0,
      dodge: 0,
      restoration: 0,
    },
  },

  mirror: {
    presence: [
      { name: 'Shadow Presence', target: 'coefficients', stats: { backstab: 0.1 }},
      { name: 'Fiery Presence', target: 'coefficients' , stats: { first: 0.15 }},
    ],
    reflex: [
      { name: 'Greater Reflex', target: 'player', stats: { dashes: 1 }},
      { name: 'Ruthless Reflex', target: 'coefficients', stats: { dodge: 0.5, mult_base: 0.5 }, status: { name: 'Ruthless Reflex', target: 'player' } },
    ],
    blood: [
      { name: 'Boiling Blood', target: ['attack', 'special'], stats: { mult_base: 0.1 }, status: { name: 'Lodged', target: 'foe' }},
      { name: 'Abyssal Blood', target: 'foe', stats: { speed: -0.05, reduction: 0.05 }, status: { name: 'Lodged', target: 'foe' }},
    ],
    soul: [
      { name: 'Infernal Soul', target: 'player', stats: { ammo: 1 }},
      { name: 'Stygian Soul', target: 'player', stats: { set_ammo_regen: 1 }},
    ],
    skin: [
      { name: 'Thick Skin', target: 'player', stats: { health: 5 }},
      { name: 'High Confidence', target: 'coefficients', stats: { mult_base: 0.05 }, status: { name: 'High Confidence', target: 'player' }},
    ],
    privlege: [
      { name: 'Privileged Status', target: 'coefficients', stats: { mult_base: 0.2 }},
      { name: 'Family Favorite', target: 'coefficients', stats: { mult_base: 0.025 }},
    ],
  },

  traits : [
    ...stygius,
    ...varatha,
    ...aegis,
    ...coronacht,
    ...malphon,
    ...exagryph,

    ...aphrodite,
    ...ares,
    ...artemis,
    ...athena,
    ...chaos,
    {
      name: 'Daedalus',
      type: 'god',
      icon: 'assets/gods/Hammer.png',
    },
    ...demeter,
    ...dionysus,
    ...hermes,
    ...poseidon,
    ...zeus,
    ...duo,
  ]
}

export default data
