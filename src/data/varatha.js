import { fv, fp, beowolf_traits } from './util'

const varatha_exclusions = [ 'Stygius', 'Aegis', 'Coronacht', 'Exagryph', 'Malphon' ]

export default [
  {
    name: 'Varatha',
    description: 'The Eternal Spear.',
    icon: 'assets/weapons/spear_base_icon.png',
    type: 'weapon',
    exclude: beowolf_traits,
    rarity: -4,
    abilities: [
      { name: 'Strike 1', type: 'damage', trigger: 'attack', stats: {min: 25, max: 25} },
      { name: 'Strike 2', type: 'damage', trigger: 'attack', stats: {min: 30, max: 30} },
      { name: 'Strike 3', type: 'damage', trigger: 'attack', stats: {min: 30, max: 30} },
      { name: 'Dash Attack', type: 'damage', trigger: 'dashAttack', stats: { min: 20, max: 20, attack: true, knockback: true } },
      { name: 'Spin Attack lvl 1', type: 'spin', trigger: 'chargeAttack', stats: {duration: 0.5, attack: true, min: 30, max: 30} },
      { name: 'Spin Attack lvl 2', type: 'spin', trigger: 'chargeAttack', stats: {duration: 0.5, attack: true, min: 50, max: 50} },
      { name: 'Spin Attack lvl 3', type: 'spin', trigger: 'chargeAttack', stats: {duration: 0.5, attack: true, min: 100, max: 100} },
      { name: 'Throw', type: 'damage', trigger: 'special', stats: {min: 25, max: 25, range: 850} },
      { name: 'Return', type: 'damage', trigger: 'special', stats: {min: 25, max: 25} },
    ],
  },
  {
    name: 'Varatha - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Varatha',
    icon: 'assets/weapons/spear_base_icon.png',
    rarity: 4,
    description: (stats) =>
      `<div>The form in which the eternal spear first revealed itself.</div>` +
      `<div><i>Its shape reflects its bearer's true self, hiding its own all the while.</i></div>` +
      `<div><div>Special Damage, Range, & Speed:</div><div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [
      {
        name: 'Aspect of Zagreus',
        type: 'effect',
        target: 'special',
        stats: {
          mult_base: [ 0.1, 0.14, 0.18, 0.22, 0.25],
          range: [ 0.1, 0.14, 0.18, 0.22, 0.25],
          speed: [ 0.1, 0.14, 0.18, 0.22, 0.25],
        }
      },
    ],
  },
  {
    name: 'Varatha - Aspect of Achilles',
    type: 'aspect',
    weapon: 'Varatha',
    icon: 'assets/weapons/spear_enchantment_1.png',
    rarity: 4,
    description: (stats) =>
      `<div>After your<b>Special,</b>you can retrieve your Spear with<b>Raging Rush.</b></div>` +
      `<div><i>The greatest of the Greeks was peerless in battle, up close and from afar.</i></div>` +
      `<div><div>Post-Rush Bonus Damage:</div><div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: 'Raging Rush',
      type: 'effect',
      target: ['attack', 'cast'],
      stats: { mult_base: [ 0.5, 0.75, 1.0, 1.25, 1.5 ] },
      status: { name: 'Raging Rush', target: 'player' },
    }],
  },
  {
    name: 'Varatha - Aspect of Hades',
    type: 'aspect',
    weapon: 'Varatha',
    icon: 'assets/weapons/spear_enchantment_2.png',
    rarity: 4,
    description: (stats) =>
      `<div>Your<b>Spin Attack</b>becomes<b>Punishing Sweep.</b></div>` +
      `<div><i>The god of the dead discarded the eternal spear for a larger counterpart.</i></div>` +
      `<div><div>Punishing Bonus Damage:</div><div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: 'Punishing Sweep',
      type: 'effect',
      target: ['attack', 'special'],
      stats: { mult_base: [ 0.3, 0.6, 0.9, 1.2, 1.5 ] },
      status: { name: 'Punishing Sweep', target: 'foe' },
    }],
  },
  {
    name: 'Varatha - Aspect of Guan Yu',
    type: 'aspect',
    weapon: 'Varatha',
    icon: 'assets/weapons/spear_enchantment_2.png',
    rarity: 4,
    description: (stats) =>
      `<div>You have the<b>Frost Fair Blade,</b>but your life and healing are reduced.</div>` +
      `<div><i>A mighty general shall battle with unmatched ferocity to unite his people.</i></div>` +
      `<div><div>Life Total & Life Gain:</div><div><span>-${ 100 - fp(stats.health_multiply) }%</span></div></div>`,
    abilities: [
      { name: 'Strike 1', type: 'attack', trigger: 'attack', stats: {min: 50, max: 50, backstab: true} },
      { name: 'Strike 2', type: 'attack', trigger: 'attack', stats: {min: 75, max: 75, backstab: true} },
      { name: 'Strike 3', type: 'attack', trigger: 'attack', stats: {min: 125, max: 125, backstab: true} },
      { name: 'Dash Attack', type: 'attack', trigger: 'dashAttack', stats: { min: 30, max: 30, attack: true, backstab: true } },
      { name: 'Serpent Slash lvl 1', type: 'spin', trigger: 'chargeAttack', stats: {attack: true, min: 30, max: 30, duration: 1.2, interval: 0.2} },
      { name: 'Serpent Slash lvl 2', type: 'spin', trigger: 'chargeAttack', stats: {attack: true, min: 50, max: 50, duration: 1.2, interval: 0.2} },
      { name: 'Serpent Slash lvl 3', type: 'spin', trigger: 'chargeAttack', stats: {attack: true, min: 100, max: 100, duration: 1.2, interval: 0.2} },
      { name: 'Crackling Skewer', type: 'attack', trigger: 'special', stats: {min: 45, max: 45, pierce: true } },
    ],
    mods: [
      {
        name: 'Frost Fair Blade',
        type: 'effect',
        target: 'player',
        stats: {
          health_multiply: [ 0.3, 0.35, 0.4, 0.45, 0.5 ]
        },
      },
    ],
  },
  {
    name: 'Extending Jab',
    type: 'hammer',
    icon: 'assets/weapons/spear_extended_thrust_03.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>has more range and deals<span>+40%</span>damage to distant foes.</div>`,
    mods: [{
      name: 'Extending Jab',
      type: 'effect',
      target: 'attack',
      stats: { mult_max: 0.4 },
    }],
  },
  {
    name: 'Chain Skewer',
    type: 'hammer',
    icon: 'assets/weapons/spear_trick_throw_04.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Special</b>bounces to up to<span>7</span>foes, dealing<span>+30%</span>damage for each.</div>`,
    mods: [{
      name: 'Chain Skewer',
      type: 'effect',
      target: 'Throw',
      stats: { mult_base: 0.4 },
      status: { target: 'foe', name: 'Chain Skewer', stacks: 7 },
      stacks: true,
    }],
  },
  {
    name: 'Breaching Skewer',
    type: 'hammer',
    icon: 'assets/weapons/spear_mighty_throw_05.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Special</b>deals<span>+400%</span>to Armor.</div>`,
    mods: [{
      name: 'Breaching Skewer',
      type: 'effect',
      target: 'special',
      stats: { mult_base: 4 },
      status: { target: 'foe', name: 'armored' },
    }],
  },
  {
    name: 'Vicious Skewer',
    type: 'hammer',
    icon: 'assets/weapons/spear_absorbing_throw_06.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Special</b>deals<span>+50%</span>damage;<span>+50%</span><b>Critical</b>chance on recovery.</div>`,
    mods: [
      {
        name: 'Vicious Skewer',
        type: 'effect',
        target: 'special',
        stats: { mult_base: 0.5 },
      },
      {
        name: 'Vicious Skewer',
        type: 'effect',
        target: 'Return',
        stats: { crit: 0.5 },
      },
    ],
  },
  {
    name: 'Exploding Launcher',
    type: 'hammer',
    icon: 'assets/weapons/spear_explosive_throw_09.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Special</b>is replaced with a shot that deals<span>50</span>damage in an area.</div>`,
    abilities: [{
      name: 'Exploding Launcher',
      type: 'explosion',
      trigger: 'special',
      stats: { min: 50 },
    }],
  },
  {
    name: 'Massive Spin',
    type: 'hammer',
    icon: 'assets/weapons/spear_massive_spin_07.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Spin Attack</b>deals<span>+125%</span>damage and hits a larger area.</div>`,
    mods: [{
      name: 'Massive Spin',
      type: 'effect',
      target: 'chargeAttack',
      stats: { mult_base: 1.25 },
    }],
  },
  {
    name: 'Quick Spin',
    type: 'hammer',
    icon: 'assets/weapons/spear_deft_spin_08.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Spin Attack</b>charges and recovers much faster.</div>`,
    mods: [{
      name: 'Quick Spin',
      type: 'effect',
      target: 'chargeAttack',
      stats: { duration: -0.2 },
    }],
  },
  {
    name: 'Flurry Jab',
    type: 'hammer',
    icon: 'assets/weapons/spear_flurry_thrust_01.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Hold<b>Attack</b>to strike rapidly, but you cannot<b>Spin Attack.</b></div>`,
    abilities: [
      { name: 'Jab', type: 'damage', trigger: 'attack', stats: {min: 30, max: 30}},
      { type: null, trigger: 'chargeAttack' },
    ],
  },
  {
    name: 'Charged Skewer',
    type: 'hammer',
    icon: 'assets/weapons/spear_long_throw_02.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Hold<b>Special</b>to charge your skewer for up to<span>+200%</span>base damage.</div>`,
    mods: [{
      name: 'Charged Skewer',
      type: 'effect',
      target: 'special',
      stats: { mult_max: 2 },
    }],
  },
  {
    name: 'Serrated Point',
    type: 'hammer',
    icon: 'assets/weapons/spear_dash_multistrike_10.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your Dash-Strike hits<span>3</span>times, but your dash has<span>-25%</span>range.</div>`,
    mods: [{
      name: 'Serrated Point',
      type: 'effect',
      target: 'Dash Attack',
      stats: { count: 3 },
    }],
  },
  {
    name: 'Flaring Spin',
    type: 'hammer',
    icon: 'assets/weapons/spear_flare_11.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Charging your<b>Spin Attack</b>makes you<b>Sturdy</b>and pulse<span>40</span>damage.</div>`,
    mods: [{
      name: 'Sturdy',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: 0.3 },
      status: { target: 'player', name: 'sturdy' }
    }],
    effects: [
      {
        name: 'Sturdy',
        type: 'sturdy',
        trigger: 'spin',
        stats: { reduction: 0.3 },
      },
      {
        name: 'Charging Pulse',
        type: 'damage',
        trigger: 'spin',
        stats: { min: 40 },
      }
    ]
  },
  {
    name: 'Triple Jab',
    type: 'hammer',
    icon: 'assets/weapons/spear_triple_13.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>strikes<span>3</span>times in a spread pattern.</div>`,
    mods: [{
      name: 'Triple Jab',
      type: 'effect',
      target: 'attack',
      stats: { count: 3 },
    }],
  },
  {
    name: 'Winged Serpent',
    type: 'hammer',
    icon: 'assets/weapons/spear_guanyu.png',
    god: 'Daedalus',
    weapon: 'Varatha',
    rarity: -3,
    prereqs: { weapon: ['Varatha - Aspect of Guan Yu'] },
    exclude: varatha_exclusions,
    description: (stats) => `<div>Your Frost Fair Blade<b>Spin Attack</b>travels for<span>+80%</span>longer.</div>`,
    mods: [{
      name: 'Winged Serpent',
      type: 'effect',
      target: 'spin',
      stats: { duration: 0.8 },
    }],
  },
]