import { fv, fp, beowolf_traits } from './util'

const exagryph_exclusions = [ 'Stygius', 'Malphon', 'Varatha', 'Exagryph', 'Coronacht' ]
const lucifer_hammers = [ 'Concentrated Beam', 'Flash Fire', 'Triple Beam', 'Eternal Chamber', 'Greater Inferno' ]

function fire(max_stacks) {
  return { name: 'Fire Hits', type: 'effect', target: 'Fire', stats: { count: 1 }, status: {target: 'foe', name: 'Fire Hits', min_stacks: 1, max_stacks } }
}

export default [
  {
    name: 'Exagryph',
    description: 'The Adamant Rail.',
    icon: 'assets/weapons/gun_base_icon.png',
    type: 'weapon',
    exclude: beowolf_traits,
    rarity: -4,
    abilities: [
      { name: 'Fire', type: 'damage', trigger: 'attack', stats: { min: 10, backstab: true } },
      { name: 'Dash Fire', type: 'damage', trigger: 'dashAttack', stats: { min: 10, backstab: true }},
      { name: 'Reload', type: 'action', trigger: 'reload' },
      { name: 'Bombard', type: 'damage', trigger: 'special', stats: { min: 60 }},
    ],
  },
  {
    name: 'Exagryph - Aspect of Zagreus',
    type: 'aspect',
    weapon: 'Exagryph',
    icon: 'assets/weapons/gun_base_icon.png',
    rarity: 4,
    exclude: lucifer_hammers,
    description: (stats) =>
      `<div>The form in which the Adamant Rail first revealed itself.</div>` +
      `<div><i>The image of the noble gryphon belies its true intent but not its power.</i></div>` +
      `<div><div>Bonus Max Ammo:</div><div><span>${ fv(stats.max_stacks - 12) }</span></div></div>`,
    // abilities: [{ name: 'Fire', type: 'damage', trigger: 'attack', stats: { min: 10, count: [16,18,20,22,24], backstab: true }}]
    mods: [
      fire([16,18,20,22,24]),
    ]
  },
  {
    name: 'Exagryph - Aspect of Eris',
    type: 'aspect',
    weapon: 'Exagryph',
    icon: 'assets/weapons/gun_enchantment_1.png',
    rarity: 4,
    exclude: lucifer_hammers,
    description: (stats) =>
      `<div>For 8 Seconds after absorbing your<b>Special's</b>blast, deal more damage.</div>` +
      `<div><i>Strife herself once stole away with it, such was its destructive allure.</i></div>` +
      `<div><div>Bonus Damage:</div><div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [
      fire(12),
      {
        name: 'Aspect of Eris',
        type: 'effect',
        target: 'coefficients',
        stats: { mult_base: [0.15, 0.3, 0.45, 0.6, 0.75] },
        status: { name: 'Strife', target: 'player' },
      }
    ]
  },
  {
    name: 'Exagryph - Aspect of Hestia',
    type: 'aspect',
    weapon: 'Exagryph',
    icon: 'assets/weapons/gun_enchantment_2.png',
    rarity: 4,
    exclude: lucifer_hammers,
    description: (stats) =>
      `<div>After you manually<b>Reload,</b>your next shot is empowered.</div>` +
      `<div><i>Before she was goddess of the hearth, she specialized in another type of fire.</i></div>` +
      `<div><div>Empowered Shot Base Damage:</div><div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      { name: 'Empowered Shot', type: 'damage', trigger: 'attack', stats: { min: [50,75,100,125,150], backstab: true }},
      { name: 'Fire', type: 'damage', trigger: 'attack', stats: { min: 10, backstab: true }},
    ],
    mods: [ fire(11) ],
  },
  {
    name: 'Exagryph - Aspect of Lucifer',
    type: 'aspect',
    weapon: 'Exagryph',
    icon: 'assets/weapons/gun_enchantment_3.png',
    rarity: 4,
    exclude: ['Flurry Fire', 'Ricochet Fire', 'Spread Fire', 'Explosive Fire', 'Delta Chamber', 'Rocket Bomb', 'Cluster Bomb', 'Seeking Fire', 'Concentrated Fire'],
    description: (stats) =>
      `<div>You have<b>Igneus Eden,</b>which launches volatile<b>Hellfire.</b></div>` +
      `<div><i>As he fell from grace, he nonetheless fought back in all his defiant fury.</i></div>` +
      `<div><div>Hellfire Blast Damage:</div><div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      { name: 'Beam', type: 'damage', trigger: 'attack', stats: { min: 10, backstab: true } },
      { type: null, trigger: 'dashAttack' },
      { name: 'Reload', type: 'action', trigger: 'reload' },
      { name: 'Hellfire', type: 'bombard', trigger: 'special', stats: { min: 20, duration: 1, radius: 400 }},
    ],
    mods: [
      {
        name: 'Beam Stack',
        type: 'effect',
        target: 'Beam',
        stats: { count: 1 },
        status: { target: 'foe', name: 'Beam', min_stacks: 1, max_stacks: 20 },
      },
      {
        name: 'Beam Ramp Offset',
        type: 'effect',
        target: 'Beam',
        stats: { min: -0.5 },
        status: { target: 'foe', name: 'Beam', max_stacks: 1 },
      },
      {
        name: 'Beam Ramp',
        type: 'effect',
        target: 'Beam',
        stats: { min: 0.5 },
        status: { target: 'foe', name: 'Beam', max_stacks: 20 },
      },
    ],
    effects: [
      {
        name: 'Detonate',
        type: 'detonate',
        trigger: 'bombard',
        stats: { min: 50, max: 100, radius: 400 },
      },
    ],
  },
  {
    name: 'Flurry Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_minigun_trait_01.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Spread Fire', 'Delta Chamber' ],
    description: (stats) => `<div>Your<b>Attack</b>is faster and more accurate; gain<span>+6</span>ammo capacity.</div>`,
    mods: [
      {
        name: 'Flurry Fire',
        type: 'meta',
        target: 'Fire Hits',
        stats: { max_stacks: 6 },
      },
      {
        name: 'Flurry Fire',
        type: 'effect',
        target: 'Fire',
        stats: { speed: 0.66 },
      },
    ],
  },
  {
    name: 'Ricochet Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_richochet_14.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Spread Fire', 'Explosive Fire', 'Seeking Fire' ],
    description: (stats) => `<div>Your<b>Attack</b>bounces to +1 other foe.</div>`,
    effects: [{
      name: 'Ricochet',
      type: 'ricochet',
      trigger: 'attack',
    }],
  },
  {
    name: 'Spread Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_shotgun_trait_02.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Flurry Fire', 'Delta Chamber', 'Ricochet Fire', 'Seeking Fire', 'Concentrated Fire' ],
    description: (stats) => `<div>Your<b>Attack</b>becomes a short spread that deals<span>40</span>base damage; lose<span class="bad_effect">-6</span>ammo capacity.</div>`,
    mods: [
      { name: 'Spread Fire', type: 'effect', target: 'attack', stats: { min: 30, range: -0.57 }},
      { name: 'Spread Fire', type: 'meta', target: 'Fire Hits', stats: { max_stacks: -6 } },
    ]
  },
  {
    name: 'Explosive Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_dash_ammo_trait_04.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Ricochet Fire', 'Piercing Fire' ],
    description: (stats) => `<div>Your<b>Attack</b>deals damage in an area and briefly slows foes.</div>`,
    mods: [{
      name: 'Explosive Fire',
      type: 'effect',
      target: 'attack',
      stats: { radius: 275 },
    }],
  },
  {
    name: 'Delta Chamber',
    type: 'hammer',
    icon: 'assets/weapons/gun_infinite_ammo_trait_09.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Spread Fire', 'Flurry Fire', 'Concentrated Fire' ],
    description: (stats) => `<div>Your<b>Attack</b>is a 3-round burst; you never have to Reload.</div>`,
    mods: [{
      name: 'Delta Chamber',
      type: 'meta',
      target: 'Fire Hits',
      stats: { max_stacks: 666 },
    }],
  },
  {
    name: 'Piercing Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_grenade_drop_trait_12.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Explosive Fire' ],
    description: (stats) => `<div>Your<b>Attack</b>pierces foes and deals<span>+50%</span>damage to Armor.</div>`,
    mods: [
      {
        name: 'Piercing Fire',
        type: 'effect',
        target: 'attack',
        stats: { pierce: true, unblockable: true },
      },
      {
        name: 'Piercing Fire',
        type: 'effect',
        target: 'attack',
        stats: { mult_base: 0.5 },
        status: { target: 'foe', name: 'Armored' },
      },
    ],
  },
  {
    name: 'Triple Bomb',
    type: 'hammer',
    icon: 'assets/weapons/gun_grenade_fast_trait_07.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Cluster Bomb', 'Hazard Bomb' ],
    description: (stats) => `<div>You can use your<b>Special</b>3 times in rapid succession.</div>`,
    mods: [{
      name: 'Triple Bomb',
      type: 'effect',
      target: 'special',
      stats: { count: 1 },
      status: { name: 'Triple Bomb', target: 'foe', min_stacks: 1, max_stacks: 3 },
    }],
  },
  {
    name: 'Rocket Bomb',
    type: 'hammer',
    icon: 'assets/weapons/gun_armor_penetration_trait_08.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Hazard Bomb' ],
    description: (stats) => `<div>Your<b>Special</b>is replaced with a rocket that deals<span>80</span>base damage.</div>`,
    abilities: [
      { name: 'Rocket', type: 'damage', trigger: 'special', stats: { min: 80 }},
    ],
  },
  {
    name: 'Targeting System',
    type: 'hammer',
    icon: 'assets/weapons/gun_homing_bullet_trait_10.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: exagryph_exclusions,
    description: (stats) => `<div>Foes targeted by your<b>Special</b>move slower and take<span>+30%</span>damage.</div>`,
    mods: [{
      name: 'Targeting System',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.3, speed: -0.1 },
      status: { target: 'foe', name: 'Targeted' },
    }],
  },
  {
    name: 'Hazard Bomb',
    type: 'hammer',
    icon: 'assets/weapons/gun_grenade_drop_trait_06.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Cluster Bomb', 'Rocket Bomb', 'Triple Bomb' ],
    description: (stats) => `<div>Your<b>Special</b>deals<span>+300%</span>base damage in a large area, but can hurt you.</div>`,
    feature: (stats) => `Your <b>Special</b> can hurt you.</div>`,
    mods: [{
      name: 'Hazard Bomb',
      type: 'effect',
      target: 'special',
      stats: { mult_base: 3 },
    }],
  },
  {
    name: 'Cluster Bomb',
    type: 'hammer',
    icon: 'assets/weapons/gun_grenade_cluster_trait_05.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Hazard Bomb', 'Triple Bomb' ],
    description: (stats) => `<div>Your<b>Special</b>fires a spread of 5 bombs, but each deals<span class="bad_effect">-30%</span>damage.</div>`,
    mods: [
      {
        name: 'Cluster Bomb',
        type: 'effect',
        target: 'special',
        stats: { mult_base: -0.3 },
      },
      {
        name: 'Cluster Bomb',
        type: 'effect',
        target: 'special',
        stats: { count: 1 },
        status: { name: 'Cluster Bomb', target: 'foe', min_stacks: 1, max_stacks: 5 },
      },
    ],
  },
  {
    name: 'Concentrated Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_consecutive_fire_trait_11.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Spread Fire', 'Delta Chamber' ],
    description: (stats) => `<div>Your<b>Attack</b>deals<span>+2</span>base damage for each uninterrupted hit to a foe.</div>`,
    mods: [
      {
        name: 'Concentrated Fire',
        type: 'effect',
        target: 'attack',
        stats: { min: 1 },
        status: { target: 'foe', name: 'Fire Hits' },
      },
      {
        name: 'Concentrated Fire Offset',
        type: 'effect',
        target: 'attack',
        stats: { min: -1 },
        status: { target: 'foe', name: 'Fire Hits', max_stacks: 1 },
      },
    ],
  },
  {
    name: 'Seeking Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_homing_bullet_trait_10.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Piercing Fire', 'Ricochet Fire', 'Spread Fire' ],
    description: (stats) => `<div>Your<b>Attack</b>seeks the nearest foe and deals<span>+10%</span>damage.</div>`,
    mods: [{
      name: 'Seeking Fire',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.1 },
    }],
  },
  {
    name: 'Concentrated Beam',
    type: 'hammer',
    icon: 'assets/weapons/gun_lucifer_04.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Eternal Chamber' ],
    description: (stats) => `<div>Your Igneus Eden<b>Attack</b>damage to a foe ramps up<span>+100%</span>faster.</div>`,
    mods: [
      {
        name: 'Concentrated Beam',
        type: 'meta',
        target: 'Beam Ramp Offset',
        stats: { min: -0.5 },
      },
      {
        name: 'Concentrated Beam',
        type: 'meta',
        target: 'Beam Ramp',
        stats: { min: 0.5 },
      }
    ],
  },
  {
    name: 'Flash Fire',
    type: 'hammer',
    icon: 'assets/weapons/gun_lucifer_05.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: exagryph_exclusions,
    description: (stats) => `<div>Your Igneus Eden<b>Attack</b>starts firing and fires<span>+50%</span>faster with<span>+15%</span>range.</div>`,
    mods: [
      { name: 'Flash Fire', type: 'effect', target: 'Beam', stats: { speed: 0.5, range: 0.15 } },
    ]
  },
  {
    name: 'Triple Beam',
    type: 'hammer',
    icon: 'assets/weapons/gun_lucifer_02.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: exagryph_exclusions,
    description: (stats) => `<div>Your Igneus Eden<b>Attack</b>fires<span>3</span>beams in a spread pattern.</div>`,
    mods: [
      { name: 'Triple Beam', type: 'effect', target: 'Beam', stats: { multiply_base: 1 }, status: { target: 'foe', name: 'Triple Beam', min_stacks: 1, max_stacks: 3 } },
    ]
  },
  {
    name: 'Eternal Chamber',
    type: 'hammer',
    icon: 'assets/weapons/gun_lucifer_03.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: [ ...exagryph_exclusions, 'Concentrated Beam' ],
    description: (stats) => `<div>Your Igneus Eden has ∞ ammo, but its damage no longer ramps.</div>`,
    mods: [
      {
        name: 'Eternal Chamber',
        type: 'meta',
        target: 'Beam Stack',
        stats: { max_stacks: 666 },
      },
      {
        name: 'Eternal Chamber',
        type: 'meta',
        target: 'Beam Ramp',
        stats: { min: -0.5 },
      },
      {
        name: 'Eternal Chamber',
        type: 'meta',
        target: 'Beam Ramp Offset',
        stats: { min: 0.5 },
      }
    ],
  },
  {
    name: 'Greater Inferno',
    type: 'hammer',
    icon: 'assets/weapons/gun_lucifer_01.png',
    god: 'Daedalus',
    weapon: 'Exagryph',
    rarity: -3,
    exclude: exagryph_exclusions,
    description: (stats) => `<div>Your Igneus Eden Hellfire radiates<span>+250%</span>damage in a larger area.</div>`,
    mods: [{
      name: 'Greater Inferno',
      type: 'effect',
      target: 'Hellfire',
      stats: { mult_base: 2.5, radius: 200 },
    }],
  },
]