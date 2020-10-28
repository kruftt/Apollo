import { fv, fp, pom, pom_1_01, pom_1_04, pom_1_1, pom_2_1, pom_3_1  } from './util'

const weak_effect = {
  name: 'Weak',
  type: 'weak',
  status: { duration: [ 4, 4, 4, 4 ], reduction: 0.3 },
}

export default [
  {
    name: 'Aphrodite',
    type: 'god',
    icon: 'assets/gods/Aphrodite.png',
  },
  {
    name: 'Heartbreak Strike',
    description: (stats) =>
      '<div>Your<b>Attack</b>deals more damage and inflicts<b>Weak</b>.</div>' +
      `<div>▶ Attack Damage:<div><span>${fp(stats.mult_min, stats.mult_max)}%</span></div></div>`,
    type: 'attack',
    icon: 'assets/traits/Aphrodite_01_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    effects: [{ ...weak_effect, trigger: 'attack' }],
    mods: [{
      name: 'Heartbreak Strike',
      type: 'stat',
      target: 'attack',
      stats: { mult_min: [0.5, 0.65, 0.9, 1.15], mult_max: [0.5, 0.75, 1.0, 1.25] },
      pom: pom_1_04,
    }],
  },
  {
    name: 'Heartbreak Flourish',
    type: 'special',
    icon: 'assets/traits/Aphrodite_secondary_attack.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>deals more damage and inflicts<b>Weak</b>.</div>' +
      `<div>▶ Special Damage:<div><span>+${fp(stats.mult_min, stats.mult_max)}%</span></div></div>`,
    abilities: [],
    effects: [ { ...weak_effect, trigger: 'special' } ],
    mods: [{
      name: 'Heartbreak Flourish',
      type: 'stat',
      target: 'special',
      stats: { mult_min: [0.8, 1.04, 1.44, 1.84], mult_max: [0.8, 1.2, 1.6, 2.0] },
      pom: pom_1_04,
    }],
  },
  {
    name: 'Crush Shot',
    type: 'cast',
    icon: 'assets/traits/Aphrodite_02_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Cast</b>is a wide, short-range blast that inflicts<b>Weak</b>.</div>' +
      `<div>▶ Cast Damage:<div><span>${fv(stats.min)}</span></div></div>`,
    abilities: [{
      name: 'Crush Shot', type: 'cast', stats: {min:[90,99,108,117]}, pom: pom_1_04,
    }],
    effects: [{...weak_effect, trigger:'cast'}],
  },
  {
    name: 'Passion Dash',
    type: 'dash',
    icon: 'assets/traits/Aphrodite_03_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>inflicts damage where you end up, inflicting<b>Weak</b>.</div>' +
      `<div>▶ Dash Damage:<div><span>${fv(stats.min)}</span></div></div>`,
    abilities: [{
      name: 'Passion Dash', type: 'dash', stats: {min:[20,24,28,32]}, pom: pom_2_1
    }],
    effects: [{...weak_effect, trigger: 'dash'}],
  },
  {
    name: "Aphrodite's Aid",
    type: 'call',
    icon: 'assets/traits/Aphrodite_04_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Call</b>fires a seeking projective that inflicts <b>Charm</b>.</div>' +
      `<div>▶ Charm Duration:<div><span>${fv(stats.duration, null, 1)} Sec.</span></div></div>`,
    abilities: [{name: "Aphrodite's Aid", type: 'call', stats: {min:1500}, pom: pom_1_04}],
    effects: [{name: 'Charm', trigger: 'call', type: 'charm', stats: {duration:[5,5.5,6,6.5]}, pom: pom(0.1, 1) }],
  },
  {
    name: "Dying Lament",
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_08_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>When foes are slain, they damage nearby foes and inflict<b>Weak</b>.</div>' +
      `<div>▶ Death Blast Damage:<div><span>${fv(stats.min,stats.max)}</span></div></div>`,
    effects: [
      {name: 'Dying Lament', trigger: 'slain', type: 'blast', stats: {min:[40,52,72,92], max:[40,60,80,100]}, pom: pom_2_1 },
      {...weak_effect, trigger: 'slain', },
    ],
  },
  {
    name: "Wave of Despair",
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_09_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>After you take damage, damage nearby foes and inflict<b>Weak</b>.</div>' +
      `<div>▶ Revenge Damage:<div><span>${fv(stats.min,stats.max)}</span></div></div>`,
    effects: [
      {name: 'Wave of Despair', trigger: 'revenge', type: 'blast', stats: {min:[50,65,90,115], max:[50,75,100,125]}, pom: pom_3_1 },
      {...weak_effect, trigger: 'revenge', },
    ],
  },
  {
    name: "Different League",
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_07_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      "<div>Resist some damage from nearby foes' attacks.</div>" +
      `<div>▶ Reduced Damage from Foes:<div><span>${fp(stats.reduction, null, 1)}%</span></div></div>`,
    mods: [
      { target: 'coefficients', type: 'stat', name: 'Different League', stats: {reduction: [0.1, 0.125, 0.15, 0.175]}, pom: pom_1_01 },
    ],
  },
  {
    name: 'Empty Inside',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_05_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    description: (stats) =>
      '<div>Your<b>Weak</b>effects have a longer duration.</div>' +
      `<div>▶ Weak Duration:<div><span>${fv(stats.duration)} Sec.</span></div></div>`,
    mods: [
      { target: 'weak', type: 'stat', name: 'Empty Inside', stats: {duration: [5, 7.5, 10, 12.5]}, pom: pom_1_1 }
    ],
  },
  {
    name: 'Sweet Surrender',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_06_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    description: (stats) =>
      '<div><b>Weak</b>afflicted foes are also more susceptible to damage.</div>' +
      `<div>▶ Damage vs. Weak:<div><span>+${fp(stats.mult_min, stats.mult_max)}%</span></div></div>`,
    mods: [{
      type: 'meta',
      target: 'Weak',
      stats: {mult_min: [0.1, 0.13, 0.2, 0.25], mult_max: [0.1, 0.15, 0.25, 0.27]},
    }],
  },
  {
    name: 'Broken Resolve',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_12_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    prereqs: {
      Aphrodite: ['Passion Dash', 'Crush Shot', 'Heartbreak Strike', 'Heartbreak Flourish']
    },
    threshold: 1,
    description: (stats) =>
      '<div>Your<b>Weak</b>effects are more potent.</div>' +
      `<div>▶ Weak Damage Reduction:<div><span>+${fp(stats.reduction, null, 1)}%</span></div></div>`,
    mods: [
      {
        type: 'meta',
        target: 'Weak',
        stats: { reduction:[0.1, 0.125, 0.15, 0.175] },
        pom: pom_1_01,
      },
      {
        type: 'stat',
        target: 'weak',
        stats: { reduction:[0.1, 0.125, 0.15, 0.175] },
        pom: pom_1_01,
      }
    ],
  },
  {
    name: 'Blown Kiss',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_13_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    prereqs: {
      Aphrodite: ['Crush Shot']
    },
    threshold: 1,
    description: (stats) =>
      '<div>Your<b>Cast</b>shoots farther and is stronger against undamaged foes.</div>' +
      `<div>▶ First-hit Bonus:<div><span>${fp(stats.first)}</span></div></div>`,
    mods: [{
      type: 'stat',
      target: 'cast',
      stats: { first: [0.5, 0.75, 1.0, 1.25], range: 2 },
    }],
  },
  {
    name: 'Unhealthy Fixation',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_10_Large.png',
    god: 'Aphrodite',
    rarity: 4,
    description: (stats) =>
      `<div>Your<b>Weak</b>effects also have a<span>${ fp(0.15) }%</span>chance to<b>Charm</b>foes.</div>` +
      `<div>▶ Charm Duration<div><span>${ fv(4) } Sec.</span></div></div>`,
    effects: [{
      name: 'Charm',
      trigger: 'weak',
      type: 'charm',
      stats: { duration: 4, chance: 0.15 }
    }],
  },
]