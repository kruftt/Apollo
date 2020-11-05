import { fv, fp } from './util'

const malphon_exclusions = [ 'Stygius', 'Aegis', 'Varatha', 'Exagryph', 'Coronacht' ]

export default [
  {
    name: 'Malphon',
    description: 'The Twin Fists of Malphon.',
    icon: 'assets/weapons/fist_base_icon.png',
    type: 'weapon',
    rarity: -4,
    abilities: [
      { name: 'Pummel', type: 'damage', trigger: 'attack', stats: {min: 15, count: 5} },
      { name: 'Dash Strike', type: 'damage', trigger: 'dashAttack', stats: { min: 25, attack: true } },
      { name: 'Rising Cutter', type: 'damage', trigger: 'special', stats: {min: 30, max: 30, count: 2} },
      { name: 'Dash Upper', type: 'damage', trigger: 'dashSpecial', stats: { min: 40 } },
    ],
  },
  {
    name: 'Malphon - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Malphon',
    icon: 'assets/weapons/fist_base_icon.png',
    rarity: 4,
    description: (stats) =>
      `<div>The form in which the Twin Fists first revealed themselves.</div>` +
      `<div><i>The twin fists are bound to their bearer, but most fiercely to each other.</i></div>` +
      `<div><div>Dodge Chance:</div><div><span>+${ fp(stats.dodge) }%</span></div></div>`,
    mods: [
      {
        name: 'Aspect of Zagreus',
        type: 'effect',
        target: 'coefficients',
        stats: { dodge: [ 0.1, 0.14, 0.18, 0.22, 0.25] }
      },
    ],
  },
  {
    name: 'Malphon - Aspect of Talos',
    type: 'aspect',
    weapon: 'Malphon',
    icon: 'assets/weapons/fist_enchantment_2.png',
    rarity: 4,
    description: (stats) =>
      `<div>Your<b>Special</b>becomes<b>Magnetic Cutter;</b>its pull deals<b>20</b>damage.</div>` +
      `<div><i>They filled the bronze giant with power, conforming to its massive frame.</i></div>` +
      `<div><div>Magnetic Attack & Cast Bonus:</div><div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    abilities: [
      { name: 'Magnetic Cutter', type: 'magnetic', trigger: 'special', stats: {min: 30, max: 30, count: 2} },
      { name: 'Dash Upper', type: 'magnetic', trigger: 'dashSpecial', stats: { min: 40 } },
    ],
    effects: [{
      name: 'Magnetic Pull',
      type: 'pull',
      trigger: 'magnetic',
      stats: { min: 20 },
    }],
    mods: [{
      name: 'Aspect of Talos',
      type: 'effect',
      target: ['attack', 'cast'],
      stats: { mult_base: [ 0.1, 0.14, 0.18, 0.22, 0.25] },
      status: { name: 'Magnetized', target: 'foe' },
    }],
  },
  {
    name: 'Malphon - Aspect of Demeter',
    type: 'aspect',
    weapon: 'Malphon',
    icon: 'assets/weapons/fist_enchantment_1.png',
    rarity: 4,
    description: (stats) =>
      `<div>After landing<b>12</b>strikes, your next<b>Special</b>hits more times.</div>` +
      `<div><i>They were a natural fit; her power to bring life, their power to take it.</i></div>` +
      `<div><div>Bonus Special Hits:</div><div><span>${ fp(stats.count) - 2 }</span></div></div>`,
    mods: [
      { name: 'Rising Cutter', type: 'effect', target: 'special', stats: {count: [3, 4, 5, 6, 7]} },
    ],
  },
  {
    name: 'Malphon - Aspect of Gilgamesh',
    type: 'aspect',
    weapon: 'Malphon',
    icon: 'assets/weapons/fist_enchantment_3.png',
    rarity: 4,
    description: (stats) =>
      `<div>You have the<b>Claws of Enkidu,</b>whose<b>Dash-Upper</b>can<b>Maim</b>foes.</div>` +
      `<div><i>The god-king inherited the furry-man's savage strength and stout heart.</i></div>` +
      `<div><div>Maim Damage:</div><div><span>${ 1.25*fv(stats.min) }</span></div></div>`,
    abilities: [
      { name: 'Swipe', type: 'damage', trigger: 'attack', stats: {min: 60, count: 5} },
      { name: 'Dash Strike', type: 'damage', trigger: 'dashAttack', stats: { min: 20, attack: true } },
      { name: 'Rising Cutter', type: 'damage', trigger: 'special', stats: {min: 30, max: 30, count: 2} },
      { name: 'Dash Upper', type: 'enkidu', trigger: 'dashSpecial', stats: { min: 40 } },
    ],
    mods: [
      { name: 'Maim', type: 'effect', target: 'coefficients', stats: { mult_base: 0.25, reduction: -0.5 }, status: { name: 'Maimed', target: 'foe' }},
      { name: 'Maim', type: 'effect', target: 'maim', stats: { min: [ 80, 140, 200, 260, 320 ] }, status: { name: 'Maimed', target: 'foe' }},
    ],
    effects: [{
      name: 'Maim',
      type: 'maim',
      trigger: 'enkidu',
    }],
  },
  {
    name: 'Breaching Cross',
    type: 'hammer',
    icon: 'assets/weapons/fist_armor_break_01.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Dash-Strike</b>pierces foes and deals<span>+900%</span>damage to<b>Armor.</b></div>`,
    mods: [
      {
        name: 'Breaching Cross',
        type: 'effect',
        target: 'dashAttack',
        stats: { pierce: true },
      },
      {
        name: 'Breaching Cross',
        type: 'effect',
        target: 'dashAttack',
        stats: { mult_base: 9 },
        status: { name: 'armored', target: 'foe' },
      },
    ],
  },
  {
    name: 'Rolling Knuckle',
    type: 'hammer',
    icon: 'assets/weapons/fist_reaching_punch_08.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Dash-Strike</b>deals<span>+60%</span>damage; added to<b>Attack</b>sequence.</div>`,
    mods: [
      {
        name: 'Rolling Knuckle',
        type: 'effect',
        target: 'dashAttack',
        stats: { mult_base: 0.6 },
      },
    ],
  },
  {
    name: 'Long Knuckle',
    type: 'hammer',
    icon: 'assets/weapons/fist_light_punch_07.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>has more range and deals<span>+10%</span>damage.</div>`,
    mods: [
      {
        name: 'Long Knuckle',
        type: 'effect',
        target: 'attack',
        stats: { mult_base: 0.1 },
      },
    ],
  },
  {
    name: 'Draining Cutter',
    type: 'hammer',
    icon: 'assets/weapons/fist_killing_nova_06.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Whenever your<b>Special</b>slays foes, restore<span>2%</span>life.</div>`,
  },
  {
    name: 'Concentrated Knuckle',
    type: 'hammer',
    icon: 'assets/weapons/fist_teleport_special_09.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+5</span>base damage for each uninterrupted hit to a foe.</div>`,
    mods: [
      {
        name: 'Concentrated Knuckle',
        type: 'effect',
        target: 'attack',
        stats: { min: 5 },
        status: { name: 'Concentrated Knuckle', target: 'foe', stacks: 5 },
        stacks: true,
      },
    ],
  },
  {
    name: 'Explosive Upper',
    type: 'hammer',
    icon: 'assets/weapons/fist_double_special_03.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Dash-Upper</b>deals<span>+100%</span>damage in an area.</div>`,
    mods: [
      {
        name: 'Explosive Upper',
        type: 'effect',
        target: 'dashSpecial',
        stats: { mult_base: 1 },
      },
    ],
  },
  {
    name: 'Flying Cutter',
    type: 'hammer',
    icon: 'assets/weapons/fist_uppercut_special_11.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Hold<b>Special</b>for longer range and up to<span>+100%</span>base damage.</div>`,
    abilities: [
      { name: 'Flying Cutter', type: 'damage', trigger: 'chargeSpecial', stats: {min: 30, max: 60, count: 2} },
    ],
  },
  {
    name: 'Rush Kick',
    type: 'hammer',
    icon: 'assets/weapons/fist_kicking_special_05.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Special</b>becomes an advancing kick that also deals<span>40</span>base damage twice.</div>`,
    abilities: [
      { name: 'Rush Kick', type: 'damage', trigger: 'special', stats: {min: 40, max: 40, count: 2} },
      { type: null, trigger: 'dashSpecial' },
    ],
  },
  {
    name: 'Quake Cutter',
    type: 'hammer',
    icon: 'assets/weapons/fist_vacuum_special_12.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>After using your<b>Special,</b>deal<span>90</span>damage in an area where you land.</div>`,
    abilities: [
      { name: 'Rising Cutter', type: 'damage', trigger: 'special', stats: {min: 30, max: 30, count: 2} },
      { name: 'Quake Cutter', type: 'damage', trigger: 'special', stats: { min: 90 } },
    ],
  },
  {
    name: 'Kinetic Launcher',
    type: 'hammer',
    icon: 'assets/weapons/fist_throwing_special_10.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Special</b>becomes a charged ranged attack that deals<span>50</span>base damage.</div>`,
    abilities: [
      { name: 'Kinetic Launcher', type: 'damage', trigger: 'special', stats: {min: 50 } },
      { type: null, trigger: 'special' },
    ],
  },
  {
    name: 'Heavy Knuckle',
    type: 'hammer',
    icon: 'assets/weapons/fist_knuckle_13.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>becomes a slower 3-hit sequence, each deals<span>40</span>base damage.</div>`,
    abilities: [
      { name: 'Heavy Knuckle', type: 'damage', trigger: 'attack', stats: {min: 40, count: 3} },
    ],
  },
  {
    name: 'Colossus Knuckle',
    type: 'hammer',
    icon: 'assets/weapons/fist_armor_knuckle_14.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div>While using your<b>Attack</b>or<b>Special,</b>you are Sturdy.</div>`,
    effect: [
      {
        name: 'Sturdy',
        type: 'effect',
        trigger: 'attack',
        status: { target: 'player', name: 'sturdy' }
      },
      {
        name: 'Sturdy',
        type: 'effect',
        trigger: 'special',
      },
    ],
  },
  {
    name: 'Rending Claws',
    type: 'hammer',
    icon: 'assets/weapons/fist_gilgamesh_02.png',
    god: 'Daedalus',
    weapon: 'Malphon',
    rarity: -3,
    exclude: malphon_exclusions,
    description: (stats) => `<div><b>Maim-afflicted</b>foes take<span>+25%</span>damage and move<span>30%</span>slower.</div>`,
    mods: [
      {
        name: 'Rending Claws',
        type: 'effect',
        target: 'coefficients',
        stats: { mult_base: 0.25 },
        status: { target: 'foe', name: 'maim' },
      },
      {
        name: 'Rending Claws',
        type: 'effect',
        target: 'foe',
        stats: { speed: -0.3 },
        status: { target: 'foe', name: 'maim' },
      },
    ],
  },
]