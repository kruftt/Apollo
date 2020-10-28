import { fv, fp } from './util'

export default [
  {
    name: 'Stygius',
    description: 'The Blade of the Underworld.',
    type: 'weapon',
    icon: 'assets/weapons/sword_base_icon.png',
    rarity: -4,
    abilities: [
      { type: 'attack', name: 'Strike', stats: {backstab:true, min: 20, max: 20} },
      { type: 'attack', name: 'Chop', stats: {backstab:true, min: 25, max: 25} },
      { type: 'attack', name: 'Thrust', stats: {backstab:true, min: 30, max: 30, knockback: true} },
      { type: 'dashAttack', name: 'Dash-attack', stats: {min: 30, max: 30, attack: true, knockback: true} },
      { type: 'special', name: 'Nova Smash', stats: {min: 50, max: 50, knockback: true, no_backstab: true} },
    ],
  },
  {
    name: 'Stygius - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_base_icon.png',
    rarity: 0,
    description: (stats) => `<div>Speed: +${ 100*stats.speed }%</div>`,
    mods: [
      { name: 'Aspect of Zagreus', type: 'stat', target: 'attack', stats: { speed: [ 0.03, 0.06, 0.09, 0.12, 0.15] } },
      { name: 'Aspect of Zagreus', type: 'stat', target: 'player', stats: { speed: [ 0.03, 0.06, 0.09, 0.12, 0.15] } },
    ],
  },
  {
    name: 'Stygius - Aspect of Nemesis',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_enchantment_1.png',
    rarity: 0,
    description: (stats) => `Crit: ${ stats.crit }`,
    mods: [
      { name: 'Aspect of Nemesis', type: 'stat', target: 'attack', stats: { crit: [ 0.15, 0.19, 0.22, 0.26, 0.3 ] }},
    ],
  },
  {
    name: 'Stygius - Aspect of Poseidon',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_enchantment_2.png',
    rarity: 0,
    mods: [
      { name: 'Aspect of Poseidon', type: 'stat', target: 'cast', stats: { mult_min: [ 0.1, 0.2, 0.3, 0.4, 0.5 ] } },
    ],
    effects: [
      { name: 'Asect of Poseidon', type: 'dislodge', trigger: 'special', stats: {} },
    ],
  },
  {
    name: 'Stygius - Aspect of Arthur',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_enchantment_3.png',
    rarity: 0,
    abilities: [
      { type: 'attack', name: 'Slash', stats: {min: 60, max: 60} },
      { type: 'attack', name: 'Big Slash',  stats: {min: 80, max: 80} },
      { type: 'attack', name: 'Monster Slash', stats: {min: 200, max: 200} },
      { type: 'special', name: 'Hallowed Ground', stats: {min: 70, max: 70} },
    ],
    mods: [
      { target: 'player', type: 'stat', name: 'Aspect of Arthur', stats: { health_add: [ 50, 50, 50, 50, 50 ] } },
      { target: 'coefficients', type: 'stat', name: 'Consecration', status: {reduction: [0.2, 0.25, 0.3, 0.35, 0.4]} },
    ],
    effects: [
      { name: 'Consecration', type: 'hallowed', trigger: 'special', stats: {} },
    ],
  },
  {
    name: 'World Splitter',
    type: 'hammer',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_giant_slash_03.png',
    god: 'Daedalus',
    rarity: -3,
    abilities: [
      {
        name: 'Chop',
        type: 'attack',
        stats: { min: 90, max: 90 },
      }
    ],
  },
]