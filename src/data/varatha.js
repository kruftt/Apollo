import { fv, fp } from './util'

export default [
  {
    name: 'Varatha',
    description: 'The Eternal Spear.',
    icon: 'assets/weapons/spear_base_icon.png',
    type: 'weapon',
    rarity: -4,
    abilities: [
      { name: 'Strike 1', type: 'attack', stats: {min: 25, max: 25} },
      { name: 'Strike 2', type: 'attack', stats: {min: 30, max: 30} },
      { name: 'Strike 3', type: 'attack', stats: {min: 30, max: 30} },
      { name: 'Dash Attack', type: 'dashAttack', stats: { min: 20, max: 20, attack: true, knockback: true } },
      { name: 'Spin Attack lvl 1', type: 'chargeAttack', stats: {attack: true, min: 30, max: 30} },
      { name: 'Spin Attack lvl 2', type: 'chargeAttack', stats: {attack: true, min: 50, max: 50} },
      { name: 'Spin Attack lvl 3', type: 'chargeAttack', stats: {attack: true, min: 100, max: 100} },
      { name: 'Throw', type: 'special', stats: {min: 25, max: 25, range: 850} },
      { name: 'Return', type: 'special', stats: {min: 25, max: 25} },
    ],
  },
  {
    name: 'Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Varatha',
    icon: 'assets/weapons/spear_base_icon.png',
    mods: [
      {
        name: 'Aspect of Zagreus',
        type: 'stat',
        target: 'special',
        stats: {
          multiplier: [ 0.1, 0.14, 0.18, 0.22, 0.25],
          range: [ 0.1, 0.14, 0.18, 0.22, 0.25],
          speed: [ 0.1, 0.14, 0.18, 0.22, 0.25],
        }
      },
    ],
    rarity: 0,
  },
]