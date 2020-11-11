import { fp, fv } from './util'

export default [
  {
    name: 'Chaos',
    type: 'god',
    icon: 'assets/gods/Chaos.png',
  },
  {
    name: 'Affluence',
    type: 'secondary',
    icon: 'assets/chaos/blessing_gold_drop_bonus_05.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Any<b>Obols</b>you find are worth<span>+${ fp(stats.mult_obols_min, stats.mult_obols_max) }%.</span></div>`,
    mods: [{
      name: 'Affluence',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_obols_min: [0.3, 0.45, 0.6], mult_obols_max: [0.5, 0.75, 1] }
    }],
  },
  {
    name: 'Ambush',
    type: 'secondary',
    icon: 'assets/chaos/backstab_15.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>You deal<span>+${ fp(stats.backstab_min, stats.backstab_max) }%</span>damage striking foes from behind.</div>` +
      `<div>(requires shadow presence)</div>`,
    mods: [{
      name: 'Ambush',
      type: 'effect',
      target: 'coefficients',
      stats: { backstab_min: [0.4, 0.6, 0.8], backstab_max: [0.6, 0.9, 1.2] },
      status: { target: 'player', name: 'Shadow Presence' },
    }],
  },
  {
    name: 'Assault',
    type: 'secondary',
    icon: 'assets/chaos/alpha_strike_14.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>You deal<span>+${ fp(stats.first_min, stats.first_max) }%</span>damage striking<b>undamaged</b>foes.</div>` +
      `<div>(requires fiery presence)</div>`,
    mods: [{
      name: 'Assault',
      type: 'effect',
      target: 'coefficients',
      stats: { first_min: [0.4, 0.6, 0.8], first_max: [0.6, 0.9, 1.2] },
      status: { target: 'player', name: 'Fiery Presence' },
    }],
  },
  {
    name: 'Eclipse',
    type: 'secondary',
    icon: 'assets/chaos/blessing_darkness_drop_bonus_06.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Any<b>Darkness</b>and<b>Gemstones</b>you find are worth<span>+${ fp(stats.darkness_min, stats.darkness_max) }%.</span></div>`,
    mods: [{
      name: 'Eclipse',
      type: 'effect',
      target: 'coefficients',
      stats: { darkness_min: [0.75,1.125,1.5], darkness_max: [1,1.5,2] }
    },],
  },
  {
    name: 'Favor',
    type: 'secondary',
    icon: 'assets/chaos/blessing_boon_rarity_increased_10.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Boons have<span>+${ fp(stats.rare_min, stats.rare_max) }%</span>chance to be<span class="rare">Rare</span>or better.</div>`,
    mods: [{
      name: 'Favor',
      type: 'effect',
      target: 'coefficients',
      stats: { rare_min: [.11, .165, .22], rare_max: [.2, .3, .4] }
    },],
  },
  {
    name: 'Flourish',
    type: 'secondary',
    icon: 'assets/chaos/blessing_secondary_damage_12.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Special</b>deals<span>+${ fp(stats.mult_min, stats.mult_max) }%</span>damage.</div>`,
    mods: [{
      name: 'Flourish',
      type: 'effect',
      target: 'special',
      stats: { mult_min: [0.3, 0.45, 0.6], mult_max: [0.6, 0.9, 1.2] },
    }],
  },
  {
    name: 'Grasp',
    type: 'secondary',
    icon: 'assets/chaos/blessing_ammo_capacity_03.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Gain<span>+1</span>Ammo.</div>`,
    mods: [{
      name: 'Grasp',
      type: 'effect',
      target: 'player',
      stats: { ammo: 1 },
    }],
  },
  {
    name: 'Lunge',
    type: 'secondary',
    icon: 'assets/chaos/blessing_dash_attack_damage_13.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Dash-Attack</b>deals<span>+${ fp(stats.mult_min, stats.mult_max) }%</span>damage.</div>`,
    mods: [{
      name: 'Lunge',
      type: 'effect',
      target: 'dashAttack',
      stats: { mult_min: [0.3,0.45,0.6], mult_max: [0.6,0.9,1.2] },
    }],
  },
  {
    name: 'Shot',
    type: 'secondary',
    icon: 'assets/chaos/blessing_cast_damage_02.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Cast</b>deals<span>+${ fp(stats.mult_min, stats.mult_max) }%</span>damage.</div>`,
    mods: [{
      name: 'Shot',
      type: 'effect',
      target: 'cast',
      stats: { mult_min: [0.3, 0.45, 0.6], mult_max: [0.4, 0.6, 0.8] },
    }],
  },
  {
    name: 'Soul',
    type: 'secondary',
    icon: 'assets/chaos/blessing_maximum_health_04.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Gain<span>+${ stats.health }</span>hp.</div>`,
    mods: [{
      name: 'Soul',
      type: 'effect',
      target: 'player',
      stats: { health: [40, 60, 80] },
    }],
  },
  {
    name: 'Strike',
    type: 'secondary',
    icon: 'assets/chaos/blessing_attack_damage_01.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Attack<b>deals<span>+${ fp(stats.mult_min, stats.mult_max) }%</span>damage.</div>`,
    mods: [{
      name: 'Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_min: [0.3, 0.45, 0.6], mult_max: [0.4, 0.6, 0.8] },
    }],
  },
  {
    name: 'Defiance',
    type: 'secondary',
    icon: 'assets/chaos/blessing_death_defiance_08.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Gain<span>+1</span><b>Death Defiance.</b></div>`,
    mods: [{
      name: 'Defiance',
      type: 'effect',
      target: 'player',
      stats: { defiance: 1 }
    }],
  },
]