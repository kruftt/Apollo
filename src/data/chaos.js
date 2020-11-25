import { fp, fv } from './util'

export default [
  {
    name: 'Chaos',
    type: 'god',
    icon: 'assets/gods/Chaos.png',
  },
  {
    name: 'Affluence',
    title: 'ChaosBlessingMoneyTrait',
    type: 'secondary',
    icon: 'assets/chaos/blessing_gold_drop_bonus_05.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Any&nbsp;<img src="/Apollo/assets/Currency_Small.png" />&nbsp;you find are worth<span>+${ fp(stats.mult_obols_min, stats.mult_obols_max) }%</span></div>`,
    feature: (stats) => `Any <img src="/Apollo/assets/Currency_Small.png" /> you find are worth <span>+${ fp(stats.mult_obols_min, stats.mult_obols_max) }%</span> </div>`,
    mods: [{
      name: 'Affluence',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_obols_min: [0.3, 0.45, 0.6], mult_obols_max: [0.5, 0.75, 1] }
    }],
  },
  {
    name: 'Ambush',
    title: 'ChaosBlessingBackstabTrait',
    type: 'secondary',
    icon: 'assets/chaos/backstab_15.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>You deal<span>+${ fp(stats.backstab_min, stats.backstab_max) }%</span>damage striking foes from behind.</div>` +
      `<div><div>Requires<b>Shadow Presence.</b></div></div>`,
    mods: [{
      name: 'Ambush',
      type: 'effect',
      target: 'coefficients',
      stats: { backstab_min: [0.6, 0.9, 1.2], backstab_max: [0.8, 1.2, 1.6] },
    }],
  },
  {
    name: 'Assault',
    title: 'ChaosBlessingAlphaStrikeTrait',
    type: 'secondary',
    icon: 'assets/chaos/alpha_strike_14.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>You deal<span>+${ fp(stats.first_min, stats.first_max) }%</span>damage striking<b>undamaged</b>foes.</div>` +
      `<div><div>Requires<b>Fiery Presence.</b></div></div>`,
    mods: [{
      name: 'Assault',
      type: 'effect',
      target: 'coefficients',
      stats: { first_min: [0.3, 0.45, 0.6], first_max: [0.5, 0.75, 1.0] },
    }],
  },
  {
    name: 'Eclipse',
    title: 'ChaosBlessingGemTrait',
    type: 'secondary',
    icon: 'assets/chaos/blessing_darkness_drop_bonus_06.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Any &nbsp;<img src="/Apollo/assets/Darkness_Small.png" />&nbsp; and &nbsp;<img src="/Apollo/assets/Gems_Small.png" />&nbsp; you find are worth<span>+${ fp(stats.darkness_min, stats.darkness_max) }%.</span></div>`,
    feature: (stats) => `<img src="/Apollo/assets/Darkness_Small.png" />&nbsp; and &nbsp;<img src="/Apollo/assets/Gems_Small.png" />&nbsp; are worth <span>+${ fp(stats.darkness_min, stats.darkness_max) }%.</span>`,
    mods: [{
      name: 'Eclipse',
      type: 'effect',
      target: 'coefficients',
      stats: { darkness_min: [0.5, 0.75, 1], darkness_max: [0.75, 1.125, 1.5] },
    },],
  },
  {
    name: 'Favor',
    title: 'ChaosBlessingBoonRarityTrait',
    type: 'secondary',
    icon: 'assets/chaos/blessing_boon_rarity_increased_10.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div><b>Boons</b> have a<span>+${ fp(stats.rare_min, stats.rare_max) }%</span>chance to be<span class="rare">Rare</span>or better.</div>`,
    feature: (stats) => `<b>Boons</b> have a <span>+${ fp(stats.rare_min, stats.rare_max) }%</span> chance to be <span class="rare">Rare</span> or better.`,
    mods: [{
      name: 'Favor',
      type: 'effect',
      target: 'coefficients',
      stats: { rare_min: [.11, .165, .22], rare_max: [.2, .3, .4] }
    },],
  },
  {
    name: 'Flourish',
    title: 'ChaosBlessingSecondaryTrait',
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
    title: 'ChaosBlessingAmmoTrait',
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
    title: 'ChaosBlessingDashAttackTrait',
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
      stats: { mult_min: [0.4,0.6,0.8], mult_max: [0.6,0.9,1.2] },
    }],
  },
  {
    name: 'Shot',
    title: 'ChaosBlessingRangedTrait',
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
    title: 'ChaosBlessingMaxHealthTrait',
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
    title: 'ChaosBlessingMeleeTrait',
    type: 'secondary',
    icon: 'assets/chaos/blessing_attack_damage_01.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Attack</b>deals<span>+${ fp(stats.mult_min, stats.mult_max) }%</span>damage.</div>`,
    mods: [{
      name: 'Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_min: [0.3, 0.45, 0.6], mult_max: [0.4, 0.6, 0.8] },
    }],
  },
  {
    name: 'Defiance',
    title: 'ChaosBlessingExtraChanceTrait',
    type: 'secondary',
    icon: 'assets/chaos/blessing_death_defiance_08.png',
    god: 'Chaos',
    rarity: 0,
    description: (stats) => `<div>Gain<span>+1</span><b>Death Defiance.</b></div>`,
    feature: (stats) => `<b><span>+1</span>Death Defiance.</b>`,
    mods: [{
      name: 'Defiance',
      type: 'effect',
      target: 'player',
      stats: { defiance: 1 },
    }],
  },
]