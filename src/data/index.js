import aphrodite from './aphrodite'
import ares from './ares'
import artemis from './artemis'
import athena from './athena'
import demeter from './demeter'
import dionysus from './dionysus'
import hermes from './hermes'
import poseidon from './poseidon'
import stygius from './stygius'
import varatha from './varatha'
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
        { name: 'Cast', type: 'cast', stats: { min: 50, max: 50, lodge: true } },
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
      type: 'stat',
      target: 'coefficients',
      stats: {
        backstab: 0.5,
      },
      status: true,
    },

    crit: {
      name: 'Crit',
      type: 'crit',
      stats: {
        multiplier: 3,
      },
    },

    weak: {
      name: 'Weak',
      type: 'stat',
      target: 'coefficients',
      stats: { reduction: 0.3 }
    },

    player: {
      name: 'Zagreus',
      stats: {
        health: 50,
        dodge: 0,
        speed: 1,
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
      },
      status: {
        boss: null,
        armored: null,
        undamaged: null,
      },
    },

    coefficients: {
      multiplier: 0,
      mult_min: 0,
      mult_max: 0,
      first: 0,
      backstab: 0,
      crit: 0,
      reduction: 0,
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
