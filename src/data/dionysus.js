import { fv, fp, pom, pom_4, pom_6 } from './util'

const _hangover = {
  name: 'Hangover',
  type: 'hangover',
  stats: { duration: 4, interval: 0.5 },
  status: { name: 'Hangover', target: 'foe' },
}

function hangover(trigger, min, pom) {
  return { ..._hangover, trigger, stats: {..._hangover.stats, min}, pom }
}

export default [
  {
    name: 'Dionysus',
    type: 'god',
    icon: 'assets/gods/Dionysus.png',
  },
  {
    name: 'Drunken Strike',
    type: 'attack',
    icon: 'assets/traits/Dionysus_01_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Attack</b>inflicts<b>Hangover.</b></div>' +
      `<div>▶ Hangover Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [hangover('attack', [4,5,6,7], pom(0.4, 0.335))],
  },
  {
    name: 'Drunken Flourish',
    type: 'special',
    icon: 'assets/traits/Dionysus_secondary_attack.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>inflicts<b>Hangover.</b></div>' +
      `<div>▶ Hangover Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [hangover('special', [5,6,7,8], pom(0.4, 0.25))],
  },
  {
    name: 'Trippy Shot',
    type: 'cast',
    icon: 'assets/traits/Dionysus_02_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    exclude: [ 'Aegis - Aspect of Beowolf' ],
    description: (stats) =>
      '<div>Your<b>Cast</b>lobs a projectile that bursts into<b>Festive Fog.</b></div>' +
      `<div>▶ Blast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Trippy Shot',
      type: 'trippy',
      trigger: 'cast',
      stats: { min: [100,120,140,160], radius: 400 },
      pom: pom_6,
    },],
    effects: [{
      name: 'Festive Fog',
      type: 'festive',
      trigger: 'trippy',
      stats: { duration: 5, interval: 0.25, radius: 400, stun: true },
    },],
  },
  {
    name: 'Trippy Flare',
    type: 'cast',
    icon: 'assets/traits/Dionysus_02_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes around you, leaving behind<b>Festive Fog.</b></div>' +
      `<div>▶ Blast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Trippy Flare',
      type: 'trippy',
      trigger: 'cast',
      stats: { min: [120,148,172,196], radius: 400 },
      pom: pom_6,
    },],
    effects: [{
      name: 'Festive Fog',
      type: 'festive',
      trigger: 'trippy',
      stats: { duration: 5, interval: 0.25, radius: 400, stun: true },
    },],
  },
  {
    name: 'Drunken Dash',
    type: 'dash',
    icon: 'assets/traits/Dionysus_03_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>inflicts foes near you with<b>Hangover.</b></div>' +
      `<div>▶ Hangover Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Drunken Dash',
      type: 'drunken',
      trigger: 'dash',
    },],
    effects: [hangover('drunken', [2,3,4,5], pom(0.2, 0.5))],
  },
  {
    name: "Dionysus' Aid",
    type: 'call',
    icon: 'assets/traits/Dionysus_04_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Call</b>inflicts<b>Hangover</b>to foes all around you for <b>1.5 Sec.</b></div>' +
      `<div>▶ Hangover Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      {
        name: "Dionysus' Aid",
        type: 'dio aid',
        trigger: 'call',
        stats: { duration: 1.5 },
      },
      {
        name: "Dionysus' Aid - Max",
        type: 'dio aid',
        trigger: 'call',
        stats: { duration: 9 },
      },
    ],
    effects: [hangover('dio aid', [15,16.5,18,19.5], pom(0.4, 0.25))],
  },
  {
    name: 'After Party',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_10_Large.png',
    god: 'Dionysus',
    rarity: 0,
    description: (stats) =>
      '<div>If your&nbsp;<img src="/Apollo/assets/Life_Small.png" />&nbsp;is low after Encounters, restore to the threshold.</div>' +
      `<div>▶ Life Threshold:<div><span>+${ fp(stats.threshold) }%</span></div></div>`,
    features: (stats) => `Life Threshold: <span>${ fp(stats.threshold) }%</span>`,
    mods: [{
      name: 'After Party',
      type: 'effect',
      target: 'coefficients',
      stats: { threshold: [0.3, 0.375, 0.45, 0.6] },
      pom: pom(0.4, 0.1, 0.4),
    },],
  },
  {
    name: 'Positive Outlook',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_12_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Take less damage while at 40% health or below.</div>' +
      `<div>▶ Damage Resistance:<div><span>+${ fp(stats.reduction) }%</span></div></div>`,
    mods: [{
      name: 'Positive Outlook',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: [0.1, 0.15, 0.2, 0.25] },
      status: { name: 'Positive Outlook', target: 'player' },
      pom: pom(0.5, 0.2),
    }],
  },
  {
    name: 'Premium Vintage',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_05_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Gain&nbsp;<img src="/Apollo/assets/LifeUp_Small.png" />&nbsp;when you pick up<b>Nectar.</b>Receive <span>1 Nectar</span> now.</div>' +
      `<div>▶ Life Gain:<div><span>${ fv(stats.health) }</span></div></div>`,
    feature: (stats) => `Gain <span>${ fv(stats.health) }</span>&nbsp;<img src="/Apollo/assets/LifeUp_Small.png" />&nbsp;when you pick up <b>Nectar.</b>`,
    mods: [{
      name: 'Premium Vintage',
      type: 'effect',
      target: 'player',
      stats: { health: [20, 25, 30, 35] },
      pom: pom_4,
    }],
  },
  {
    name: 'Strong Drink',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_13_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Using a<b>Fountain</b>restores <span>100%</span><img src="/Apollo/assets/LifeRestore_Small.png" />&nbsp;and gives you bonus damage.</div>' +
      `<div>▶ Bonus Damage per Fountain:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    feature: (stats) =>
      `Bonus Damage per Fountain: <span>+${ fp(stats.mult_base) }%</span>`,
    mods: [{
      name: 'Strong Drink',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_base: [ 0.03, 0.04, 0.05, 0.06 ] },
      pom: pom(0.2, 0.1),
    }],
  },
  {
    name: 'Bad Influence',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_09_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    prereqs: { Dionysus: ["Dionysus' Aid", "Drunken Dash", 'Drunken Flourish', 'Drunken Strike'] },
    description: (stats) =>
      '<div>Deal more damage while 3 foes are<b>Hangover</b>afflicted.</div>' +
      `<div>▶ Bonus Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    mods: [{
        name: 'Bad Influence',
        type: 'effect',
        target: 'coefficients',
        stats: { mult_min: [0.5, 0.65, 0.9, 1.15], mult_max: [0.5, 0.75, 1.0, 1.25] },
        status: { target: 'player', name: 'Bad Influence' },
        pom: pom_4,
      },
    ],
  },
  {
    name: 'Numbing Sensation',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_06_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    prereqs: { Dionysus: ["Dionysus' Aid", "Drunken Dash", 'Drunken Flourish', 'Drunken Strike'] },
    description: (stats) =>
      '<div>Your<b>Hangover</b>effects also make foes move slower.</div>' +
      `<div>▶ Speed Reduction<div><span>${ fp(stats.speed) }%</span></div></div>`,
    mods: [{
      name: 'hangover',
      type: 'effect',
      target: 'foe',
      stats: { speed: [-0.15, -0.225, -0.3, -0.375] },
      status: { name: 'hangover', target: 'foe' },
      pom: pom(0.4, 0.2),
    }],
  },
  {
    name: 'Peer Pressure',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_07_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    prereqs: { Dionysus: ['Drunken Dash', 'Drunken Flourish', 'Drunken Strike'] },
    description: (stats) =>
      '<div><b>Hangover</b>afflicted foes contaminate other nearby foes every<b>4 sec.</b></div>' +
      `<div>▶ Hangover Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Peer Pressure',
      type: 'pressure',
      trigger: 'hangover',
      stats: { min: [4,5,6,7], duration: 4, interval: 0.5 },
      pom: pom(0.4, 0.25),
    },],
  },
  {
    name: 'High Tolerance',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_11_Large.png',
    god: 'Dionysus',
    rarity: 0,
    level: 1,
    prereqs: { Dionysus: ['Trippy Shot', 'Trippy Flare'] },
    description: (stats) =>
      '<div>Take less damage while standing in<b>Festive Fog.</b></div>' +
      `<div>▶ Damage Resistance:<div><span>+${ fp(stats.reduction) }%</span></div></div>`,
    mods: [{
      name: 'Festive Fog',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: [0.10, 0.15, 0.2, 0.25] },
      status: { name: 'Festive Fog', target: 'player' },
      pom: pom_4,
    }],
  },
  {
    name: 'Black Out',
    type: 'secondary',
    icon: 'assets/traits/Dionysus_08_Large.png',
    god: 'Dionysus',
    rarity: 4,
    prereqs: { Trippy: ['Trippy Shot'], Dionysus: ["Dionysus' Aid", 'Drunken Flourish', "Drunken Strike"] },
    description: (stats) =>
      '<div><b>Hangover</b>afflicted foes take bonus damage in <b>Festive Fog.</b></div>' +
      `<div>▶ Bonus Damage:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [
      {
        name: 'Black Out',
        type: 'effect',
        target: 'coefficients',
        status: { target: 'foe', name: 'Hangover' },
      },
      {
        name: 'Black Out',
        type: 'meta',
        target: 'Black Out',
        stats: { mult_base: 0.6 },
        status: { target: 'foe', name: 'Festive Fog' },
      },
    ],
    effects: [
      {
        name: 'Hangover?',
        type: 'hangover bonus',
        trigger: 'festive',
        stats: { multiplier: 0.6 },
      }
    ]
  },
]