import { fv, fp, beowolf_traits } from './util'
const stygius_exclusions = [ 'Coronacht', 'Aegis', 'Varatha', 'Exagryph', 'Malphon' ]

export default [
  {
    name: 'Stygius',
    description: 'The Blade of the Underworld.',
    type: 'weapon',
    exclude: beowolf_traits,
    icon: 'assets/weapons/sword_base_icon.png',
    rarity: -4,
    abilities: [
      { type: 'damage', trigger: 'attack', name: 'Strike', stats: {backstab:true, min: 20, max: 20} },
      { type: 'damage', trigger: 'attack', name: 'Chop', stats: {backstab:true, min: 25, max: 25} },
      { type: 'damage', trigger: 'attack', name: 'Thrust', stats: {backstab:true, min: 30, max: 30, knockback: true} },
      { type: 'damage', trigger: 'dashAttack', name: 'Dash-attack', stats: {backstab:true, min: 30, max: 30, knockback: true} },
      { type: 'damage', trigger: 'special', name: 'Nova Smash', stats: {min: 50, max: 50, knockback: true } },
    ],
  },
  {
    name: 'Stygius - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_base_icon.png',
    rarity: 4,
    description: (stats) =>
      `<div>The form in which the blade of the underworld first revealed itself.</div>` +
      `<div><i>A blade such as this seeks not to remain idle for more than an aeon or two.</i></div>` +
      `<div><div>Bonus Attack Speed & Move Speed:</div><div><span>+${ fp(stats.speed) }%</span></div></div>`,
    mods: [
      { name: 'Aspect of Zagreus', type: 'effect', target: 'attack', stats: { speed: [ 0.03, 0.06, 0.09, 0.12, 0.15] } },
      { name: 'Aspect of Zagreus', type: 'effect', target: 'player', stats: { speed: [ 0.03, 0.06, 0.09, 0.12, 0.15] } },
    ],
  },
  {
    name: 'Stygius - Aspect of Nemesis',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_enchantment_2.png',
    rarity: 4,
    description: (stats) =>
      `<div>For<b>3</b>Sec. after you<b>Special,</b> your<b>Attack</b>may deal<b>Critical</b>damage.</div>` +
      `<div><i>One of Nyx's daughters once brandished the blade against the arrogant.</i></div>` +
      `<div><div>Bonus<b>Critical</b>Chance:</div><div><span>+${ fp(stats.crit) }%</span></div></div>`,
    mods: [
      { name: 'Aspect of Nemesis', type: 'effect', target: 'attack', stats: {crit: [ 0.15, 0.19, 0.22, 0.26, 0.3 ]}, status: {target: 'player', name: 'Nemesis'}},
    ],
  },
  {
    name: 'Stygius - Aspect of Poseidon',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_enchantment_1.png',
    rarity: 4,
    description: (stats) =>
      `<div>Your<b>Special</b>dislodges&nbsp;<img src="/Apollo/assets/AmmoIcon.png" />&nbsp;from foes.</div>` +
      `<div><i>Even before he ruled the seas, the blade's first bearer liked making a splash.</i></div>` +
      `<div><div>Cast Damage:</div><div><span>+${ fp(stats.mult_min) }%</span></div></div>`,
    mods: [
      { name: 'Aspect of Poseidon', type: 'effect', target: 'cast', stats: { mult_min: [ 0.1, 0.2, 0.3, 0.4, 0.5 ] } },
    ],
    effects: [
      { name: 'Dislodge', type: 'dislodge', trigger: 'special', stats: {} },
    ],
  },
  {
    name: 'Stygius - Aspect of Arthur',
    type: 'aspect',
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_enchantment_3.png',
    rarity: 4,
    description: (stats) =>
      `<div>You have<b>Holy Excalibur,</b> and<b>+50 Health</b>to your Life Total.</div>` +
      `<div><i>Peace and destruction await a kingdom governed by the rule of might.</i></div>` +
      `<div><div>Aura Damage Reduction:</div><div><span>+${ fp(stats.reduction) }%</span></div></div>`,
    abilities: [
      { type: 'damage', trigger: 'attack', name: 'Slash', stats: {backstab: true, min: 60, max: 60} },
      { type: 'damage', trigger: 'attack', name: 'Big Slash',  stats: {backstab: true, min: 80, max: 80} },
      { type: 'damage', trigger: 'attack', name: 'Monster Slash', stats: {backstab: true, min: 200, max: 200} },
      { type: 'damage', trigger: 'special', name: 'Hallowed Ground', stats: {min: 70, max: 70} },
    ],
    mods: [
      { target: 'player', type: 'effect', name: 'Aspect of Arthur', stats: { health: [ 50, 50, 50, 50, 50 ] } },
      { target: 'coefficients', type: 'effect', name: 'Consecration', stats: {reduction: [0.2, 0.25, 0.3, 0.35, 0.4]}, status: { name: 'Consecration', target: 'player' } },
    ],
    effects: [
      { name: 'Consecration', type: 'hallowed', trigger: 'special' },
    ],
  },
  {
    name: 'Breaching Slash',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_punturing_blade_06.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+300%</span>damage to<b>Armor.</b></div>`,
    mods: [
      {
        name: 'Breaching Slash',
        type: 'damage',
        target: 'attack',
        stats: { mult_base: 3 },
        status: { target: 'foe', name: 'Armored' },
      }
    ],
  },
  {
    name: 'Cruel Thrust',
    type: 'hammer',
    exclude: [ ...stygius_exclusions, 'World Splitter', 'Flurry Slash' ],
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_cursed_thrust_09.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Thrust</b>deals<span>+200%</span>damage and has a<span>+40% Critical</span>chance.</div>`,
    abilities: [
      { type: 'damage', trigger: 'attack', name: 'Strike', stats: {backstab:true, min: 20, max: 20} },
      { type: 'damage', trigger: 'attack', name: 'Chop', stats: {backstab:true, min: 25, max: 25} },
      { type: 'damage', trigger: 'attack', name: 'Thrust', stats: {backstab:true, min: 30, max: 30, knockback: true, mult_base: 2, crit: 0.4} },
    ],
  },
  {
    name: 'Cursed Slash',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_cursed_lifesteal_trait_12.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Attack</b>restores<span>2 Health,</span> but you have<span class="bad_effect">-60% Health.</span></div>`,
    mods: [
      {
        name: 'Cursed Slash',
        type: 'effect',
        target: 'player',
        stats: { health_multiply: 0.4 },
      },
      {
        name: 'Cursed Slash',
        type: 'effect',
        target: 'attack',
        stats: { lifesteal: 2 },
      }
    ],
  },
  {
    name: 'Dash Nova',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_seeking_14.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Special</b>makes you lunge ahead, then become<b>Sturdy</b>for<span>0.8 Sec.</span></div>`,
    abilities: [{
      type: 'damage',
      trigger: 'special',
      name: 'Dash Nova',
      stats: {min: 50, max: 50, knockback: true }
    }],
    mods: [{
      name: 'Sturdy',
      type: 'sturdy',
      target: 'coefficients',
      stats: { reduction: 0.3 },
      status: { target: 'player', name: 'Sturdy' }
    }],
    effects: [{
      name: 'Sturdy',
      type: 'sturdy',
      trigger: 'attack',
    }]
  },
  {
    name: 'Double Edge',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_killing_thrust_07.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Dash-Strike</b>hits twice and deals<span>+20% damage.</span></div>`,
    mods: [
      { type: 'effect', target: 'dashAttack', name: 'Double Edge', stats: { mult_base: 0.2 } },
      { type: 'effect', target: 'dashAttack', name: 'Double Edge', stats: { count: 1 }, status: { target: 'foe', name: 'Double Edge', stacks: true, min_stacks: 1, max_stacks: 2 } },
    ],
  },
  {
    name: 'Double Nova',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_blink_strike_04.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Special</b>hits twice but no longer knocks foes away.</div>`,
    mods: [
      { type: 'effect', target: 'special', name: 'Double Nova', stats: { knockback: false } },
      { type: 'effect', target: 'special', name: 'Double Nova', stats: { count: 1 }, status: { target: 'foe', name: 'Double Nova', stacks: true, min_stacks: 1, max_stacks: 2 } },
    ],
  },
  {
    name: 'Flurry Slash',
    type: 'hammer',
    exclude: [ ...stygius_exclusions, 'World Splitter', 'Cruel Thrust' ],
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_sudden_slash_01.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Hold<b>Attack</b>to strike rapidly, dealing<span>25</span>base damage per hit.</div>`,
    abilities: [
      {
        name: 'Flurry Slash',
        type: 'damage',
        trigger: 'attack',
        stats: { min: 25 },
      }
    ],
  },
  {
    name: 'Hoarding Slash',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_hoard_13.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Attack</b>deals bonus damage equal to<span>5%</span>of your current Obols.</div>`,
    mods: [
      {
        name: 'Hoarding Slash',
        type: 'effect',
        target: 'attack',
        stats: { mult_base: 0.0005 },
        status: { target: 'player', name: 'Obols', stacks: 100000 },
        stacks: true,
      }
    ],
  },
  {
    name: 'Piercing Wave',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_blade_nova_02.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Attack</b>fires a wave that<span>pierces</span>foes, dealing 30 damage.</div>`,
    effects: [
      {
        name: 'Piercing Wave',
        type: 'pwave',
        trigger: 'attack',
        stats: { min: 30, pierce: true },
      }
    ],
  },
  {
    name: 'Shadow Slash',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_backstab_trait_10.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+200%</span>damage when striking foes from behind.</div>`,
    mods: [
      {
        name: 'Shadow Slash',
        type: 'effect',
        target: 'attack',
        stats: { backstab: 1 },
      }
    ],
  },
  {
    name: 'Super Nova',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_superior_deflection_08.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Special</b>hits a wider area and deals<span>+20% damage.</span></div>`,
    mods: [
      {
        name: 'Super Nova',
        type: 'effect',
        target: 'special',
        stats: { mult_base: 0.2 },
      }
    ],
  },
  {
    name: 'World Splitter',
    type: 'hammer',
    exclude: [ ...stygius_exclusions, 'Flurry Slash', 'Cruel Thrust' ],
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_giant_slash_03.png',
    god: 'Daedalus',
    rarity: -3,
    description: (stats) => `<div>Your<b>Attack</b>is replaced with a big chop that deals<span>90</span>base damage.</div>`,
    abilities: [
      {
        name: 'Chop',
        type: 'damage',
        trigger: 'attack',
        stats: { min: 90, max: 90 },
      }
    ],
  },
  {
    name: 'Greater Consecration',
    type: 'hammer',
    exclude: stygius_exclusions,
    weapon: 'Stygius',
    icon: 'assets/weapons/sword_arthur_15.png',
    god: 'Daedalus',
    rarity: -3,
    prereqs: { Arthur: ['Stygius - Aspect of Arthur'] },
    description: (stats) => `<div>Your<b>Holy Excalibur</b>aura is<span>+45%</span>larger; makes foes<span>+10%</span>slower.</div>`,
    mods: [
      {
        name: 'Greater Consecration',
        type: 'effect',
        target: 'consecration',
        stats: { area: 0.45, proj_speed: -0.1 },
      }
    ],
  },
]