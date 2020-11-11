import { fv, fp, pom, pom_4, pom_6, pom_8 } from './util'

// const deflect = {
//   name: 'Deflect',
//   type: 'deflect',
//   stats: { deflect: 1 }
// }

function deflect (trigger) {
  return {
    name: 'Deflect',
    type: 'deflect',
    trigger,
    stats: { deflect: 1 },
  }
}

export default [
  {
    name: 'Athena',
    type: 'god',
    icon: 'assets/gods/Athena.png',
  },
  {
    name: 'Divine Strike',
    type: 'attack',
    icon: 'assets/traits/Athena_01_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your <b>Attack</b> is stronger, and can <b>Deflect.</b></div>' +
      `<div>▶ Attack Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max ) }%</span></div></div>`,
    mods: [{
      name: 'Divine Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_min: [0.4,0.52,0.72,0.92], mult_max: [0.4,0.6,0.8,1] },
      pom: pom_4,
    }],
    effects: [deflect('attack')],
  },
  {
    name: 'Divine Flourish',
    type: 'special',
    icon: 'assets/traits/Athena_secondary_attack.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>is stronger, and can<b>Deflect.</b></div>' +
      `<div>▶ Special Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    effects: [deflect('special')],
    mods: [{
      name: 'Divine Flourish',
      type: 'effect',
      target: 'special',
      stats: { mult_min: [0.6, 0.78, 1.08, 1.38], mult_max: [0.6, 0.9, 1.2, 1.5] },
      pom: pom_4,
    }],
  },
  {
    name: 'Phalanx Shot',
    type: 'cast',
    icon: 'assets/traits/Athena_02_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes in a small area, and can <b>Deflect.</b></div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Phalanx Shot',
      type: 'phalanx',
      trigger: 'cast',
      stats: { min: [85, 102, 119, 136] },
      pom: pom_6,
    }],
    effects: [deflect('phalanx')],
  },
  {
    name: 'Phalanx Flare',
    type: 'cast',
    icon: 'assets/traits/Athena_02_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes around you, and can <b>Deflect.</b></div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Phalanx Flare',
      type: 'phalanx',
      trigger: 'cast',
      stats: { min: [80, 90, 100, 110] },
      pom: pom_6,
    }],
    effects: [deflect('phalanx')],
  },
  {
    name: 'Divine Dash',
    type: 'dash',
    icon: 'assets/traits/Athena_03_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>deals damage and can<b>Deflect.</b></div>' +
      `<div>▶ Dash Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    mods: [{
      name: 'Divine Dash',
      type: 'effect', // deflect
      target: 'dash',
      stats: { name: 'Divine Dash', min: [10, 12, 14, 16] },
      pom: pom(0.6, 0.2),
    }],
    effects: [deflect('dash')],
  },
  {
    name: "Athena's Aid",
    type: 'call',
    icon: 'assets/traits/Athena_04_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Call</b>briefly makes you<b>Invulnerable</b>and<b>Deflect</b>all attacks.</div>' +
      `<div>▶ Effect Duration:<div><span>${ fv(stats.duration, null, 1) }</span></div></div>`,
    abilities: [
      {
        name: "Athena's Aid",
        type: 'shield',
        trigger: 'call',
        stats: { duration: [1.5, 1.65, 1.8, 1.95] },
        pom: pom(0.4, 0.2)
      },
      {
        name: "Athena's Aid - Max",
        type: 'shield',
        trigger: 'call',
        stats: { duration: [9, 9.9, 10.8, 11.7] },
        pom: pom(0.4, 0.2)
      },
    ],
    effects: [
      { name: 'Invulnerable', type: 'deflect', trigger: 'call' },
      deflect('call'),
    ],
  },
  {
    name: 'Holy Shield',
    type: 'secondary',
    icon: 'assets/traits/Athena_08_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>After you take damage, damage nearby foes and briefly<b>Deflect.</b></div>' +
      `<div>▶ Revenge Damage:<div><span>${ fv(stats.min, stats.max) }</span></div></div>`,
    effects: [
      {
        name: 'Holy Shield',
        type: 'shield',
        trigger: 'revenge',
        stats: { min: [30, 39, 54, 69 ], max: [30, 45, 60, 75], radius: 225 },
        pom: pom_8,
      },
      deflect('shield'),
    ],
  },
  {
    name: 'Bronze Skin',
    type: 'secondary',
    icon: 'assets/traits/Athena_06_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Resist damage from foes' attacks.</div>` +
      `<div>▶ Reduced Damage:<div><span>${ fp(stats.reduction) }%</span></div></div>`,
    mods: [{
      name: 'Bronze Skin',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: [0.05, 0.075, 0.1, 0.125] },
      pom: pom(0.5, 0.5),
    }],
  },
  {
    name: 'Sure Footing',
    type: 'secondary',
    icon: 'assets/traits/Athena_07_Large.png',
    god: 'Athena',
    rarity: 0,
    description: (stats) =>
      '<div>Resist damage from<b>Traps.</b></div>' +
      `<div>▶ Reduced Trap Damage:<div><span>+${ fp(stats.reduction) }%</span></div></div>`,
    mods: [{
      name: 'Sure Footing',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: [ 0.6, 0.75, 0.9, 0.95 ] },
      status: { target: 'foe', name: 'trap' },
      pom: pom_4,
    }],
  },
  {
    name: 'Proud Bearing',
    type: 'secondary',
    icon: 'assets/traits/Athena_13_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    prereqs: {call: ["Aphrodite's Aid", "Ares' Aid", "Artemis' Aid", "Athena's Aid", "Demeter's Aid", "Dionysus' Aid", "Poseidon's Aid", "Zeus' Aid" ]},
    description: (stats) =>
      '<div>You begin each<b>Encounter</b>with your<b>God Gauge</b>partly full.</div>' +
      `<div>▶ Starting Gauge:<div><span>+${ fp(stats.gauge_start) }%</span></div></div>`,
    effects: [{
      name: 'Proud Bearing', type: 'buff', trigger: 'start', stats: { gauge_start: [0.2, 0.25, 0.3, 0.4], pom: pom(0.5) }
    }],
  },
  {
    name: 'Blinding Flash',
    type: 'secondary',
    icon: 'assets/traits/Athena_14_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    prereqs: { Athena: ['Divine Strike', 'Phalanx Shot', 'Divine Dash', 'Divine Flourish'] },
    description: (stats) =>
      '<div>Your abilities that can<b>Deflect</b>also make foes<span>Exposed</span>for <b>5 Sec.</b></div>' +
      `<div>▶ Bonus Backstab Damage:<div><span>+${ fp(stats.backstab) }%</span></div></div>`,
    mods: [
      {
        name: 'Blinding Flash',
        type: 'effect',
        target: 'coefficients',
        stats: { backstab: [0.5, 0.625, 0.75, 0.875] },
        status: { target: 'foe', name: 'exposed' },
        pom: pom_4,
      }
    ],
  },
  {
    name: 'Brilliant Reposte',
    type: 'secondary',
    icon: 'assets/traits/Athena_05_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    prereqs: { Athena: ['Divine Strike', 'Divine Dash', 'Holy Shield', 'Divine Flourish'] },
    description: (stats) =>
      '<div>When you<b>Deflect</b>attacks, they deal more damage.</div>' +
      `<div>▶ Deflect Damage:<div><span>+${ fp(stats.deflect) }%</span></div></div>`,
    mods: [{
      name: 'Brilliant Reposte',
      type: 'effect',
      target: 'deflect',
      stats: { deflect: [0.8, 1.12, 1.8, 2] },
      pom: pom_4,
    }],
  },
  {
    name: 'Deathless Stand',
    type: 'secondary',
    icon: 'assets/traits/Athena_11_Large.png',
    god: 'Athena',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div><b>Death Defiance</b>makes you <b>Impervious</b>longer. Replenish 1 charge now.</div>' +
      `<div>▶ Effect Duration:<div><span>+${ fv(stats.duration) } Sec.</span></div></div>`,
    mods: [{
      name: 'Deathless Stand',
      type: 'effect',
      target: 'defiance',
      stats: { duration: [ 2, 2.5, 3, 3.5 ] },
      pom: pom_4,
    }],
  },
  {
    name: 'Last Stand',
    type: 'secondary',
    icon: 'assets/traits/Athena_12_Large.png',
    god: 'Athena',
    rarity: 0,
    description: (stats) =>
      '<div><b>Death Defiance</b>restores more <3 than usual. Replenish<b>1</b>charge now.</div>' +
      `<div>▶ Improved Restoration:<div><span>+${ fp(stats.restore) }%</span></div></div>`,
    mods: [{
      name: 'Last Stand',
      type: 'effect',
      target: 'defiance',
      stats: { restore: [0.1, 0.12, 0.14, 0.16] },
    }],
  },
  {
    name: 'Divine Protection',
    type: 'secondary',
    icon: 'assets/traits/Athena_10_Large.png',
    god: 'Athena',
    rarity: 4,
    prereqs: { Athena: ['Brilliant Riposte'] },
    description: (stats) =>
      '<div>You have a barrier that negates incoming damage.</div>' +
      `<div>▶ Barrier Cooldown:<div><span>20 Sec.</span></div></div>`,
  },
]