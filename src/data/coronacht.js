import { fv, fp, beowolf_traits } from './util'

const coronacht_exclusions = [ 'Stygius', 'Aegis', 'Varatha', 'Exagryph', 'Malphon' ]

function volley(max_stacks) {
  return {
    name: 'Volley Hits',
    type: 'effect',
    target: 'Volley Fire',
    stats: { count: 1 },
    status: { name: 'Volley Hits', target: 'foe', min_stacks: 1, max_stacks },
  }
}

export default [
  {
    name: 'Coronacht',
    description: 'The Heart-Seeking Bow.',
    icon: 'assets/weapons/bow_base_icon.png',
    type: 'weapon',
    exclude: beowolf_traits,
    rarity: -4,
    abilities: [
      { name: 'Fire', type: 'shot', trigger: 'attack', stats: {min: 20, max: 60, backstab: true, pierce: true} },
      { name: 'Power Shot', type: 'shot', trigger: 'chargeAttack', stats: {duration: 1, min: 70, backstab: true, pierce: true} },
      { name: 'Dash Attack', type: 'shot', trigger: 'dashAttack', stats: {min: 20, max: 40, backstab: true, pierce: true} },
      { name: 'Dash - Power Shot', type: 'shot', trigger: 'dashAttack', stats: {duration: 1, min: 50, backstab: true, pierce: true} },
      { name: 'Volley Fire', type: 'volley', trigger: 'special', stats: {min: 10, backstab: true} },
    ],
  },
  {
    name: 'Coronacht - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: 'assets/weapons/bow_base_icon.png',
    rarity: 4,
    description: (stats) =>
      `<div>The form in which the heart-seeking bow first revealed itself.</div>` +
      `<div><i>It senses stalwart hearts, mostly to stop them but occasionally to be used.</i></div>` +
      `<div><div><b>Critical</b>Attack Chance:</div><div><span>+${ fp(stats.crit) }%</span></div></div>`,
    mods: [
      volley(9),
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
    icon: 'assets/weapons/bow_echantment_1.png',
    rarity: 4,
    exclude: [ 'Charged Volley' ],
    description: (stats) =>
      `<div>Your <b>Special</b> automatically seeks the foe last struck by your <b>Attack.</b></div>` +
      `<div><i>When first it was fashioned, the centaur lord himself affirmed its might.</i></div>` +
      `<div><div>Max Shots per<b>Special:</b></div><div><span>${ fv(stats.max_stacks) }</span></div></div>`,
    feature: (stats) =>
      `Your <b>Special</b> automatically seeks the foe last struck by your <b>Attack.</b>`,
    mods: [volley([4,5,6,7,8])],
  },
  {
    name: 'Coronacht - Aspect of Hera',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: 'assets/weapons/bow_echantment_2.png',
    rarity: 4,
    description: (stats) =>
      `<div>Your <b>Cast</b> loads &nbsp;<img src="/Apollo/assets/AmmoIcon.png" />&nbsp; into your next <b>Attack</b>, firing on impact.</div>` +
      `<div><i>None dared approach the queen of the gods, a reputation she cultivated.</i></div>` +
      `<div>Ammo Drop Time:<div><span>${ fv(15 + stats.duration, null, 1) }s</span></div></div>`,
    feature: (stats) =>
      `<b>Attacks</b> trigger <b>Casts</b> by loading &nbsp;<img src="/Apollo/assets/AmmoIcon.png" />`,
    mods: [
      volley(9),
      {
        name: 'Aspect of Hera',
        type: 'effect',
        target: 'dislodge',
        stats: { duration: [-5, -7, -8.33, -8.85, -10]},
      }
    ],
  },
  {
    name: 'Coronacht - Aspect of Rama',
    type: 'aspect',
    weapon: 'Coronacht',
    icon: 'assets/weapons/bow_enchantment_3.png',
    god: 'Rama',
    rarity: 4,
    exclude: ['Flurry Shot', 'Piercing Volley', 'Charged Volley', 'Concentrated Volley'],
    description: (stats) =>
      `<div>You have <b class="Rama">Celestial Sharanga</b>, which can cause <b class="Rama">Shared Suffering.</b></div>` +
      `<div><i>The preserver's marksmanship is one of his many unequaled qualities</i></div>` +
      `<div>Shared Suffering Damage:<div><span>${ fp(stats.shared) }%</span>of<b>Attack</b>for<b>7 Sec.</b></div></div>`,
    feature: (stats) =>
      `<b>Attacks</b> do <span>${ fp(stats.shared) }%</span> of their damage to all foes with <b class="Rama">Shared Suffering.</b>`,
    abilities: [
      { name: 'Fire', type: 'shot', trigger: 'attack', stats: {min: 25, max: 120, pierce: true, backstab: true } },
      { name: 'Dash Strike', type: 'shot', trigger: 'dashAttack', stats: { min: 25, max: 80, pierce: true, backstab: true } },
      { name: 'Volley Fire', type: 'volley', trigger: 'special', stats: {min: 5, backstab: true} },
      { name: 'Power Shot', type: 'shot', trigger: 'chargeAttack', stats: {duration: 2, min: 175, pierce: true, backstab: true} },
      { name: 'Power Shot - Dash', type: 'shot', trigger: 'chargeAttack', stats: {duration: 2, min: 125, pierce: true, backstab: true} },
    ],
    effects: [{ name: 'Shared Suffering', type: 'shared', trigger: 'volley', stats: { shared: [0.30, 0.38, 0.45, 0.53, 0.60] }}],
    mods: [volley(3)],
  },
  {
    name: 'Twin Shot',
    type: 'hammer',
    icon: 'assets/weapons/bow_double_shot_08.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Triple Shot', 'Sniper Shot'],
    description: (stats) => `<div>Your<b>Attack</b>fires<span>2</span>shots side-by-side, but has reduced range.</div>`,
    mods: [
      {
        name: 'Twin Shot',
        type: 'effect',
        target: 'shot',
        stats: { range: -0.5 },
      },
      {
        name: 'Twin Shot',
        type: 'effect',
        target: 'shot',
        stats: { count: 1 },
        status: { name: 'Twin Shot', target: 'foe', min_stacks: 1, max_stacks: 2 },
      },
    ],
  },
  {
    name: 'Sniper Shot',
    type: 'hammer',
    icon: 'assets/weapons/bow_sniper_shot_02.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, "Point-Blank Shot", 'Twin Shot'],
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
    icon: 'assets/weapons/bow_heavy_charge_03.png',
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
    icon: 'assets/weapons/bow_second_shot_15.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Perfect Shot', 'Explosive Shot' ],
    description: (stats) => `<div>Hold<b>Attack</b>to shoot rapidly, but you cannot Power Shot.</div>`,
    abilities: [
      { name: 'Flurry', type: 'shot', trigger: 'attack', stats: {min: 60, pierce: true} },
      { name: 'Dash Flurry', type: 'damage', trigger: 'dashAttack', stats: { min: 40, pierce: true } },
      { type: null, trigger: 'chargeAttack' },
    ],
  },
  {
    name: 'Piercing Volley',
    type: 'hammer',
    icon: 'assets/weapons/bow_penetrating_shot_05.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Coronacht - Aspect of Rama' ],
    description: (stats) => `<div>Your<b>Special</b>pierces foes and deals<span>400%</span>damage to Armor.</div>`,
    mods: [
      {
        name: 'Piercing Volley',
        type: 'effect',
        target: 'special',
        stats: { mult_base: 4 },
        status: { target: 'foe', name: 'Armored' }
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
    icon: 'assets/weapons/bow_perfect_shot_06.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Flurry Shot' ],
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
    icon: 'assets/weapons/bow_arrow_storm_07.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Charged Volley' ],
    description: (stats) => `<div>Your<b>Special</b>shoots<span>+4</span>shots.</div>`,
    mods: [{
      name: 'Relentless Volley',
      type: 'meta',
      target: 'Volley Hits',
      stats: { max_stacks: 4 },
    }],
  },
  {
    name: 'Triple Shot',
    type: 'hammer',
    icon: 'assets/weapons/bow_fan_shot_09.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Twin Shot' ],
    description: (stats) => `<div>Your<b>Attack</b>fires<span>3</span>shots in a spread pattern.</div>`,
    mods: [{
      name: 'Triple Shot',
      type: 'effect',
      target: 'attack',
      stats: { count: 1 },
      status: { name: 'Triple Shot', target: 'foe', min_stacks: 1, max_stacks: 3 },
    }],
  },
  {
    name: 'Charged Volley',
    type: 'hammer',
    icon: 'assets/weapons/bow_secondary_charge_trait_11.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Relentless Volley' ],
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
    icon: 'assets/weapons/bow_chain_shot_trait_10.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Explosive Shot' ],
    description: (stats) => `<div>Your<b>Attack</b>bounces to up to 3 foes, dealing<span>+15%</span>damage for each.</div>`,
    mods: [{
      name: 'Chain Shot',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.15 },
      status: { target: 'foe', name: 'Chain Shot Bounce', max_stacks: 3 },
    }],
  },
  {
    name: 'Point-Blank Shot',
    type: 'hammer',
    icon: 'assets/weapons/bow_point_blank_16.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Sniper Shot' ],
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+150%</span>damage to nearby foes.</div>`,
    mods: [{
      name: 'Point-Blank Shot',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 1.5 },
      status: { target: 'foe', name: 'Nearby' },
    }],
  },
  {
    name: 'Concentrated Volley',
    type: 'hammer',
    icon: 'assets/weapons/bow_consecutive_barrage_13.png',
    god: 'Daedalus',
    weapon: 'Coronacht',
    rarity: -3,
    exclude: [ ...coronacht_exclusions, 'Coronacht - Aspect of Rama' ],
    description: (stats) => `<div>Your<b>Special</b>deals<span>+3</span>base damage for each consecutive hit to a foe.</div>`,
    mods: [
      {
        name: 'Concentrated Volley',
        type: 'effect',
        target: 'special',
        stats: { min: 1.5 },
        status: { target: 'foe', name: 'Volley Hits' },
      },
      {
        name: 'Concentrated Volley offset',
        type: 'effect',
        target: 'special',
        stats: { min: -1.5 },
        status: { target: 'foe', name: 'Volley Hits' },
      },
    ],
  },
  {
    name: 'Repulse Shot',
    type: 'hammer',
    icon: 'assets/weapons/bow_rama_14.png',
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