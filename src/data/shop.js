import { fp, fv } from './util'

export default [
  {
    name: 'Charon',
    type: 'god',
    icon: 'assets/shop/Gameplay_WellShop_01.png',
  },
  // &nbsp;<img src="/Apollo/assets/Currency_Small.png" />&nbsp;
  {
    name: 'Aether Net',
    type: 'secondary',
    icon: 'assets/shop/net_20.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Your<b>God Gauge<b>starts with<span>+${ fp(stats.gauge_start) }%</span></b></div>`,
    feature: (stats) => `Your <b>God Gauge<b> starts with <span>+${ fp(stats.gauge_start) }%</span></b>`,
    mods: [{
      name: 'Aether Net',
      type: 'effect',
      target: 'coefficients',
      stats: { gauge_start: 0.15 },
    }],
  },
  {
    name: 'Braid of Atlas',
    type: 'secondary',
    icon: 'assets/shop/braid_of_atlas_04.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Your<b>Cast</b>deals<span>+${ fp(stats.mult_base) }%</span>damage.</div>`,
    mods: [{
      name: 'Braid of Atlas',
      type: 'effect',
      target: 'cast',
      stats: { mult_base: 0.5 },
    }],
  },
  {
    name: 'Chimaera Jerky',
    type: 'secondary',
    icon: 'assets/shop/jerky_22.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Your<b>Special</b>deals<span>+${ fp(stats.mult_base) }%</span>damage.</div>`,
    mods: [{
      name: 'Chimaera Jerky',
      type: 'effect',
      target: 'special',
      stats: { mult_base: 0.4 },
    }],
  },
  {
    name: 'Cyclops Jerky',
    type: 'secondary',
    icon: 'assets/shop/cyclops_jerky_01.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Your<b>Attack</b>deals<span>+${ fp(stats.mult_base) }%</span>damage.</div>`,
    mods: [{
      name: 'Cyclops Jerky',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.3 },
    }],
  },
  {
    name: 'Cyclops Jerky Select',
    type: 'secondary',
    icon: 'assets/shop/cyclops_jerky_01.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Your<b>Attack</b>deals<span>+${ fp(stats.mult_base) }%</span>damage.</div>`,
    mods: [{
      name: 'Cyclops Jerky Select',
      type: 'effect',
      target: 'attack',
      stats: { mult_base: 0.6 },
    }],
  },
  {
    name: 'Eris Bangle',
    type: 'secondary',
    icon: 'assets/shop/bangle_14.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>You deal<span>+50%</span>damage striking<b>undamaged</b>foes.</div>`,
    mods: [{
      name: 'Eris Bangle',
      type: 'effect',
      target: 'coefficients',
      stats: { first: 0.5 },
      status: { target: 'foe', name: 'First Hit' },
    }],
  },
  {
    name: 'Ignited Ichor',
    type: 'secondary',
    icon: 'assets/shop/ignited_ichor_09.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Gain<span>20%</span>move speed.</div>`,
    mods: [{
      name: 'Ignited Ichor',
      type: 'effect',
      target: 'player',
      stats: { speed: 0.2 },
    }],
  },
  {
    name: 'Nail of Talos',
    type: 'secondary',
    icon: 'assets/shop/nail_19.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>You deal<span>+50%</span>damage to<b>Armor.</b></div>`,
    mods: [{
      name: 'Nail of Talos',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_base: 0.5 },
      status: { target: 'foe', name: 'Armored' },
    }],
  },
  {
    name: 'Nemesis Crest',
    type: 'secondary',
    icon: 'assets/shop/brooch_15.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>You deal +50% damage striking foes from behind.</div>`,
    mods: [{
      name: '',
      type: 'effect',
      target: 'coefficients',
      stats: { backstab: 0.5 },
    }],
  },
  {
    name: 'Prometheus Stone',
    type: 'secondary',
    icon: 'assets/shop/prometheus_stone_03.png',
    god: 'Charon',
    rarity: -5,
    description: (stats) =>
      `<div>Gain +1&nbsp;<img src="/Apollo/assets/AmmoIcon.png"/>&nbsp;for your Cast.</div>`,
    mods: [{
      name: 'Prometheus Stone',
      type: 'effect',
      target: 'player',
      stats: { ammo: 1 },
    }],
  },
]