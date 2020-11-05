import aphrodite from './aphrodite'
import ares from './ares'
import artemis from './artemis'
import athena from './athena'
import coronacht from './coronacht'
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
        { name: 'Cast', type: 'damage', trigger: 'cast', stats: { min: 50, max: 50, lodge: true } },
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

    shadow: {
      name: 'Shadow Presence',
      type: 'effect',
      target: 'coefficients',
      stats: { backstab: 0.5 },
      status: { target: 'player', name: 'Shadow Presence' },
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
      type: 'chill',
      target: 'foe',
      stats: { speed: -0.04 },
      status: { name: 'chill', target: 'foe' },
      stacks: true,
    },

    weak: {
      name: 'Weak',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: 0.3 }
    },

    slam: {
      name: 'Slam',
      type: 'slam',
      trigger: 'knockback',
      stats: { min: 20 },
    },

    player: {
      name: 'Zagreus',
      stats: {
        health: 50,
        dodge: 0,
        speed: 1,
        ammo: 2,
      },
      status: {
        'Backstab': null,
        'Shadow Presence': null,
      },
    },

    foe: {
      name: 'Foe',
      stats: {
        health: 100,
        speed: 1,
      },
      status: {
        undamaged: null,
      },
    },

    coefficients: {
      mult_base: 0,
      mult_min: 0,
      mult_max: 0,
      first: 0,
      backstab: 0,
      crit: 0,  // Chance
      crit_min: 0,  // Chance
      crit_max: 0,  // Chance
      reduction: 0,
      restoration: 0,
    },
  },

  traits : [
    {
      name: 'Daedalus',
      type: 'god',
      icon: 'assets/gods/Hammer.png',
    },

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
    ...demeter,
    ...dionysus,
    ...hermes,
    ...poseidon,
    ...zeus,

    ...duo,
  ]
}

export default data
