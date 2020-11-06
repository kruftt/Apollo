import { fp, fv } from './util'

const aegis_exclusions = [ 'Stygius', 'Malphon', 'Varatha', 'Exagryph', 'Coronacht' ]

export default [
  {
    name: 'Aegis',
    description: 'The Shield of Chaos.',
    type: 'weapon',
    icon: 'assets/weapons/shield_base_icon.png',
    rarity: -4,
    abilities: [
      { type: 'damage', trigger: 'attack', name: 'Bash', stats: {backstab:true, min: 25} },
      { type: 'damage', trigger: 'chargeAttack', name: 'Bull Rush', stats: {backstab:true, min: 20, max:40, duration: 2, defend: true} },
      { type: 'damage', trigger: 'dashAttack', name: 'Dash-Strike', stats: {backstab:true, min: 25} },
      { type: 'damage', trigger: 'special', name: 'Throw', stats: {min: 15, backstab: true} },
    ],
  },
  {
    name: 'Aegis - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Aegis',
    icon: 'assets/weapons/shield_base_icon.png',
    rarity: 4,
    description: (stats) =>
      `<div>The form in which the shield of chaos first revealed itself.</div>` +
      `<div><i>Sometimes the bone-etched visage shudders as though it means to speak.</i></div>` +
      `<div>Attack & Dash-Strike Base Damage:<div><span>+${ fv(stats.min) }</span></div></div>`,
    mods: [
      { name: 'Aspect of Zagreus', type: 'effect', target: 'attack', stats: { min: [ 3, 6, 9, 12, 15] } },
    ],
  },
  {
    name: 'Aegis - Aspect of Chaos',
    type: 'aspect',
    weapon: 'Aegis',
    icon: 'assets/weapons/shield_enchantment_2.png',
    rarity: 4,
    description: (stats) =>
      `<div>After you <b>Bull Rush</b> your next <b>Special</b> throws multiple shields.</div>` +
      `<div><i>All sprang from the primordial depths; only one artifact bore witness.</i></div>` +
      `<div>Bonus Shields Thrown:<div><span>+${ stats.bonus_shields }</span></div></div>`,
    mods: [
      { name: 'Aspect of Chaos', type: 'effect', target: 'special', stats: { bonus_shields: [ 1,2,3,4,5] } },
    ],
  },
  {
    name: 'Aegis - Aspect of Zeus',
    type: 'aspect',
    weapon: 'Aegis',
    icon: 'assets/weapons/shield_enchantment_1.png',
    rarity: 4,
    description: (stats) =>
      `<div>Your <b>Special</b> is replaced with the <b>Blitz Disc.</b></div>` +
      `<div><i>Once he became king of the Olympians, he truly had nothing left to fear.</i></div>` +
      `<div>Blitz Disc Base Damage per Hit:<div><span>+${ fv(stats.min) }</span></div></div>`,
    abilities: [
      { name: 'Blitz Disc', type: 'blitz', trigger: 'special', stats: { min: [8,13,19,24,30] } },
    ],
  },
  {
    name: 'Aegis - Aspect of Beowolf',
    type: 'aspect',
    weapon: 'Aegis',
    icon: 'assets/weapons/shield_enchantment_3.png',
    rarity: 4,
    description: (stats) =>
      `<div>You have <b>Naegling's Board</b> but take +10% damage.</b></div>` +
      `<div><i>Would that the stalwart warrior-king's sword offered similar protection.</i></div>` +
      `<div>Dragon Rush Bonus Damage & Area:<div><span>+${ fp(stats.mult_base) }</span></div></div>`,
    abilities: [
      { name: 'Heavy Bash', type: 'damage', trigger: 'attack', stats: { min: 40, knockback: true, backstab: true } },
      { name: 'Bull Rush', type: 'bull', trigger: 'chargeAttack', stats: { min: 50, defend: true, backstab: true } },
      { name: 'Dragon Rush', type: 'dragon', trigger: 'chargeAttack', stats: { min: 50, defend: true, backstab: true } },
      { name: 'Heavy Throw', type: 'damage', trigger: 'special', stats: { min: 45, backstab: true } },
      { type: null, trigger: 'cast' },
    ],
    mods: [{
      name: 'Aspect of Beowolf',
      type: 'effect',
      target: 'dragon',
      stats: { mult_base: [0.2, 0.4, 0.6, 0.8, 1] },
    },]
  },
  {
    name: 'Dread Flight',
    type: 'hammer',
    icon: 'assets/weapons/shield_deadly_return_04.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Special</b>can strike up to<span>4</span>additional foes before returning.</div>`,
    mods: [{
      name: 'Dread Flight',
      type: 'effect',
      target: 'special',
      stats: { count: 4 },
    }],
  },
  {
    name: 'Sudden Rush',
    type: 'hammer',
    icon: 'assets/weapons/shield_swift_rush_05.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Bull Rush</b>charges much faster.</div>`,
    mods: [{
      name: 'Sudden Rush',
      type: 'effect',
      target: 'chargeAttack',
      stats: { duration: -1 },
    }],
  },
  {
    name: 'Pulverizing Blow',
    type: 'hammer',
    icon: 'assets/weapons/shield_shatter_strike_06.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Attack</b>hits twice, but does not knock foes away.</div>`,
    mods: [{
      name: 'Pulverizing Blow',
      type: 'effect',
      target: 'attack',
      stats: { count: 2, knockback: false },
    }],
  },
  {
    name: 'Dashing Wallop',
    type: 'hammer',
    icon: 'assets/weapons/shield_iron_skin_01.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Dash Attack</b>deals<span>+50%</span>damage in a larger area.</div>`,
    mods: [{
      name: 'Dashing Wallop',
      type: 'effect',
      target: 'dashAttack',
      stats: { mult_base: 0.5 },
    }],
  },
  {
    name: 'Explosive Return',
    type: 'hammer',
    icon: 'assets/weapons/shield_superior_retaliation_07.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Special</b>deals<span>50</span>damage to nearby foes when you catch it.</div>`,
    effects: [{
      name: 'Explosive Return',
      type: 'explosive',
      trigger: 'special',
      stats: { min: 50 },
    }],
  },
  {
    name: 'Minotaur Rush',
    type: 'hammer',
    icon: 'assets/weapons/shield_minotaur_rush_08.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Bull Rush</b>gains a Power Rush that does<span>+500%</span>damage.</div>`,
    abilities: [
      { type: 'damage', trigger: 'chargeAttack', name: 'Bull Rush', stats: {backstab:true, min: 20, max:40, duration: 2, defend: true} },
      { type: 'damage', trigger: 'chargeAttack', name: 'Power Rush', stats: {backstab:true, min: 20, max:40, duration: 2, defend: true, mult_base: 5} },
    ]
  },
  {
    name: 'Breaching Rush',
    type: 'hammer',
    icon: 'assets/weapons/shield_divine_immunity_02.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Bull Rush</b>deals<span>+400%</span>damage to Armor.</div>`,
    mods: [{
      name: 'Breaching Rush',
      type: 'effect',
      target: 'chargeAttack',
      stats: { mult_base: 4 },
      status: { target: 'foe', name: 'armored' },
    }],
  },
  {
    name: 'Charged Shot',
    type: 'hammer',
    icon: 'assets/weapons/shield_vicious_throw_09.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Your<b>Bull Rush</b>instead fires a piercing shot that deals<span>80</span>base damage.</div>`,
    abilities: [
      { type: 'damage', trigger: 'chargeAttack', name: 'Charged Shot', stats: {backstab:true, unblockable: true, min: 80, duration: 2, piercing: true, defend: true} },
    ],
  },
  {
    name: 'Charged Flight',
    type: 'hammer',
    icon: 'assets/weapons/shield_throw_elective_charge_12.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>Hold<b>Special</b>to charge your throw for up to<span>+200%</span>base damage.</div>`,
    mods: [
      {
        name: 'Charged Flight',
        type: 'effect',
        target: 'special',
        stats: { mult_max: 2 },
      },
    ],
  },
  {
    name: 'Empowering Flight',
    type: 'hammer',
    icon: 'assets/weapons/shield_empower_throw_13.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>After your<b>Special</b>hits, your next 2 Attacks deal<span>+80%</span>.</div>`,
    mods: [{
      name: 'Empowering Flight',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.8 },
      status: { target: 'player', name: 'Empowering Flight' },

    }],
  },
  {
    name: 'Dashing Flight',
    type: 'hammer',
    icon: 'assets/weapons/shield_dash_throw_16.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>While you<b>Dash,</b>your<b>Special</b>is faster and deals<span>+100%</span>damage.</div>`,
    mods: [{
      name: 'Dashing Flight',
      type: 'effect',
      target: 'special',
      stats: { mult_base: 1 },
      status: { target: 'player', name: 'dashing' },
    }],
  },
  {
    name: 'Ferocious Guard',
    type: 'hammer',
    icon: 'assets/weapons/shield_empower_block_14.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>After blocking a foe, gain<span>+20%</span>damage and move speed for 10 Sec.</div>`,
    mods: [{
      name: 'Ferocious Guard',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_base: 0.2, speed: 0.2 },
      status: { target: 'player', name: 'Ferocious Guard' },
    }],
  },
  {
    name: 'Unyielding Defense',
    type: 'hammer',
    icon: 'assets/weapons/shield_beowulf.png',
    god: 'Daedalus',
    weapon: 'Aegis',
    rarity: -3,
    exclude: aegis_exclusions,
    description: (stats) => `<div>After using your Naegling's Board Cast, you are<span>Sturdy</span>for<span>3 Sec.</span></div>`,
    effect: [{
      name: 'Sturdy',
      type: 'effect',
      trigger: 'attack',
      status: { target: 'player', name: 'sturdy' }
    }],
  },
]