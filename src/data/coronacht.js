import { fv, fp } from './util'

const coronacht_exclusions = [ 'Stygius', 'Aegis', 'Varatha', 'Exagryph', 'Malphon' ]

export default [
  {
    name: 'Coronacht',
    description: 'The Heart-Seeking Bow.',
    icon: '/assets/weapons/bow_base_icon.png',
    type: 'weapon',
    rarity: -4,
    abilities: [
      { name: 'Fire', type: 'shot', trigger: 'attack', stats: {min: 20, max: 60, pierce: true} },
      { name: 'Power Shot', type: 'shot', trigger: 'chargeAttack', stats: {min: 70, attack: true, pierce: true} },
      { name: 'Power Shot - Dash', type: 'shot', trigger: 'chargeAttack', stats: {min: 50, attack: true, pierce: true} },
      { name: 'Dash Attack', type: 'damage', trigger: 'dashAttack', stats: { min: 20, max: 40, attack: true, pierce: true } },
      { name: 'Volley Fire', type: 'damage', trigger: 'special', stats: {min: 10, count: 9} },
    ],
  },
  {
    name: 'Coronacht - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: '/assets/weapons/bow_base_icon.png',
    rarity: 4,
    description: (stats) =>
      `<div>The form in which the heart-seeking bow first revealed itself.</div>` +
      `<div><i>It senses stalwart hearts, mostly to stop them but occasionally to be used.</i></div>` +
      `<div><div><b>Critical</b>Attack Chance:</div><div><span>+${ fp(stats.crit) }%</span></div></div>`,
    mods: [
      {
        name: 'Aspect of Zagreus',
        type: 'effect',
        target: 'coefficients',
        stats: {
          crit: [ 0.02, 0.04, 0.06, 0.08, 0.1 ],
        }
      },
    ],
  },
  {
    name: 'Coronacht - Aspect of Chiron',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: '/assets/weapons/bow_echantment_1.png',
    rarity: 4,
    description: (stats) =>
    `<div>Your <b>Special</b> automatically seeks the foe last struck by your <b>Attack</b>.</div>` +
    `<div><i>When first it was fashioned, the centaur lord himself affirmed its might.</i></div>` +
    `<div><div>Max Shots per<b>Special:</b></div><div><span>${ fv(stats.count) }</span></div></div>`,
    abilities: [
      { name: 'Volley Fire', type: 'damage', trigger: 'special', stats: {min: 10, count: [4,5,6,7,8]} },
    ],
  },
  {
    name: 'Coronacht - Aspect of Hera',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: '/assets/weapons/bow_echantment_2.png',
    rarity: 4,
    description: (stats) =>
    `<div>Your <b>Cast</b> loads <b>Ammo</b> into your next <b>Attack</b>, firing on impact.</div>` +
    `<div><i>None dared approach the queen of the gods, a reputation she cultivated.</i></div>` +
    `<div>Ammo Drop Time:<div><span>${ 15 + fv(stats.duration) }s</span></div></div>`,
    mods: [{
      name: 'Aspect of Hera',
      type: 'effect',
      target: 'lodge',
      stats: { duration: [-5, -7, -8.33, -8.85, -10]},
    }]
  },
  {
    name: 'Coronacht - Aspect of Rama',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: '/assets/weapons/bow_enchantment_3.png',
    rarity: 4,
    description: (stats) =>
    `<div>You have <b>Celestial Sharanga</b>, which can cause <b>Shared Suffering</b>.</div>` +
    `<div><i>The preserver's marksmanship is one of his many unequaled qualities</i></div>` +
    `<div>Shared Suffering Damage:<div><span>${ fp(stats.shared) }%</span>of<b>Attack</b>for<b>7 Sec.</b></div></div>`,
    abilities: [
      { name: 'Fire', type: 'shot', trigger: 'attack', stats: {min: 25, max: 120, pierce: true} },
      { name: 'Dash Strike', type: 'shot', trigger: 'dashAttack', stats: { min: 25, max: 80, attack: true, pierce: true } },
      { name: 'Volley Fire', type: 'volley', trigger: 'special', stats: {min: 5, count: 3} },
      { name: 'Power Shot', type: 'shot', trigger: 'chargeAttack', stats: {min: 175, pierce: true, attack: true} },
      { name: 'Power Shot - Dash', type: 'shot', trigger: 'chargeAttack', stats: {min: 125, pierce: true, attack: true} },
    ],
    effects: [
      {
        name: 'Shared Suffering',
        type: 'shared',
        trigger: 'volley',
      },
      {
        name: 'Shared Suffering',
        type: 'shared',
        trigger: 'attack',
        stats: { shared: [0.3, 0.38, 0.45, 0.53, 0.6] },
        status: { target: 'foe', name: 'Shared Suffering' },
      },
    ],
  },
  {
    name: 'Twin Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_double_shot_08.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>fires<span>2</span>shots side-by-side, but has reduced range.</div>`,
    mods: [{
      name: 'Twin Shot',
      type: 'effect',
      target: 'shot',
      stats: { count: 2 },
    }],
  },
  {
    name: 'Sniper Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_sniper_shot_02.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+200%</span>damage to distant foes.</div>`,
    mods: [{
      name: 'Sniper Shot',
      type: 'effect',
      target: 'shot',
      stats: { mult_max: 2 },
    }],
  },
  {
    name: 'Explosive Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_heavy_charge_03.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+300%</span>base damage in an area, but charges slower.</div>`,
    mods: [{
      name: 'Explosive Shot',
      type: 'effect',
      target: 'attack',
      stats: { multiply_base: 3, radius: 350, multiply_duration: 2 },
    }],
  },
  {
    name: 'Flurry Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_second_shot_15.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Hold<b>Attack</b>to shoot rapidly, but you cannot Power Shot.</div>`,
    abilities: [
      { name: 'Flurry', type: 'shot', trigger: 'attack', stats: {min: 60, pierce: true} },
      { name: 'Dash Flurry', type: 'damage', trigger: 'dashAttack', stats: { min: 40, attack: 40, pierce: true } },
      { type: null, trigger: 'chargeAttack' },
    ],
  },
  {
    name: 'Piercing Volley',
    type: 'hammer',
    icon: '/assets/weapons/bow_penetrating_shot_05.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Special</b>pierces foes and deals<span>400%</span>damage to Armor.</div>`,
    mods: [
      {
        name: 'Piercing Volley',
        type: 'effect',
        target: 'special',
        stats: { mult_base: 4 },
        status: { target: 'foe', name: 'armored' }
      },
      {
        name: 'Piercing Volley',
        type: 'effect',
        target: 'special',
        stats: { pierce: true },
      },
    ]
  },
  {
    name: 'Perfect Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_perfect_shot_06.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Power Shot</b>is easier to execute and deals<span>150%</span>damage.</div>`,
    mods: [{
      name: 'Perfect Shot',
      type: 'effect',
      target: ['Power Shot', 'Power Shot - Dash'],
      stats: { mult_base: 1.5 },
    }],
  },
  {
    name: 'Relentless Volley',
    type: 'hammer',
    icon: '/assets/weapons/bow_arrow_storm_07.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Special</b>shoots<span>+4</span>shots.</div>`,
    mods: [{
      name: 'Relentless Volley',
      type: 'effect',
      target: 'Volley Fire',
      stats: { count: 4 },
    }],
  },
  {
    name: 'Triple Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_fan_shot_09.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>fires<span>3</span>shots in a spread pattern.</div>`,
    mods: [{
      name: 'Triple Shot',
      type: 'effect',
      target: 'attack',
      stats: { count: 3 },
    }],
  },
  {
    name: 'Charged Volley',
    type: 'hammer',
    icon: '/assets/weapons/bow_secondary_charge_trait_11.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Hold<b>Special</b>for up to<span>350%</span>base damage; minimum range is reduced.</div>`,
    mods: [{
      name: 'Charged Volley',
      type: 'effect',
      target: 'special',
      stats: { multiply_max: 3.5 },
    }],
  },
  {
    name: 'Chain Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_chain_shot_trait_10.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>bounces to up to 3 foes, dealing<span>+15%</span>damage for each.</div>`,
    mods: [{
      name: 'Chain Shot',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.15 },
      status: { target: 'foe', name: 'Chain Shot', stacks: 3 },
      stacks: true,
    }],
  },
  {
    name: 'Point-Blank Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_point_blank_16.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+150%</span>damage to nearby foes.</div>`,
    mods: [{
      name: 'Point-Blank Shot',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 1.5 },
      status: { target: 'foe', name: 'Point-Blank' },
    }],
  },
  {
    name: 'Concentrated Volley',
    type: 'hammer',
    icon: '/assets/weapons/bow_consecutive_barrage_13.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Special</b>deals<span>+3</span>base damage for each consecutive hit to a foe.</div>`,
    mods: [{
      name: 'Concentrated Volley',
      type: 'effect',
      target: 'special',
      stats: { min: 3 },
      status: { target: 'foe', name: 'Concentrated Volley', stacks: 13 },
      stacks: true,
    }],
  },
  {
    name: 'Repulse Shot',
    type: 'hammer',
    icon: '/assets/weapons/bow_rama_14.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    prereqs: { Rama: ['Coronacht - Aspect of Rama'] },
    exclude: coronacht_exclusions,
    description: (stats) => `<div>Your<b>Celestial Sharanga Attack</b>creates a<b>Blast Wave</b>around you.</div>`,
    effects: [{
      name: 'Repulse Shot',
      type: 'blast',
      trigger: 'attack',
      stats: { knockback: true },
    }],
  },

]