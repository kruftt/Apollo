import { beowolf_cast_exclusions, fv, fp, pom, pom_4, pom_6, pom_8, } from './util'

function weak(trigger) {
  return {
    name: 'Weak',
    type: 'weak',
    trigger,
    stats: { duration: [ 4, 4, 4, 4 ], reduction: 0.3 },
    status: { name: 'Weak', target: 'foe' },
  }
}

export default [
  {
    name: 'Aphrodite',
    type: 'god',
    icon: 'assets/gods/Aphrodite.png',
  },
  {
    name: 'Heartbreak Strike',
    title: 'AphroditeWeaponTrait',
    description: (stats) =>
      '<div>Your<b>Attack</b>deals more damage and inflicts<b>Weak.</b></div>' +
      `<div>▶ Attack Damage:<div><span>${fp(stats.mult_min, stats.mult_max)}%</span></div></div>`,
    type: 'attack',
    icon: 'assets/traits/Aphrodite_01_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    effects: [ weak('attack' ) ],
    mods: [{
      name: 'Heartbreak Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_min: [0.5, 0.65, 0.9, 1.15], mult_max: [0.5, 0.75, 1.0, 1.25] },
      pom: pom_4,
    }],
  },
  {
    name: 'Heartbreak Flourish',
    title: 'AphroditeSecondaryTrait',
    type: 'special',
    icon: 'assets/traits/Aphrodite_secondary_attack.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>deals more damage and inflicts<b>Weak.</b></div>' +
      `<div>▶ Special Damage:<div><span>+${fp(stats.mult_min, stats.mult_max)}%</span></div></div>`,
    effects: [ weak('special') ],
    mods: [{
      name: 'Heartbreak Flourish',
      type: 'effect',
      target: 'special',
      stats: { mult_min: [0.8, 1.04, 1.44, 1.84], mult_max: [0.8, 1.2, 1.6, 2.0] },
      pom: pom_4,
    }],
  },
  {
    name: 'Crush Shot',
    title: 'AphroditeRangedTrait',
    type: 'cast',
    icon: 'assets/traits/Aphrodite_02_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    exclude: [ 'Aegis - Aspect of Beowolf' ],
    description: (stats) =>
      '<div>Your<b>Cast</b>is a wide, short-range blast that inflicts<b>Weak.</b></div>' +
      `<div>▶ Cast Damage:<div><span>${fv(stats.min)}</span></div></div>`,
    effects: [ weak('cast') ],
    abilities: [{
      name: 'Crush Shot',
      type: 'crush',
      trigger: 'cast',
      stats: { min:[90,100,110,120] },
      pom: pom_6,
    }],
  },
  {
    name: 'Passion Flare',
    title: 'ShieldLoadAmmo_AphroditeRangedTrait',
    type: 'cast',
    icon: 'assets/traits/Aphrodite_02_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    exclude: beowolf_cast_exclusions,
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes around you and inflicts<b>Weak.</b></div>' +
      `<div>▶ Cast Damage:<div><span>${fv(stats.min)}</span></div></div>`,
    effects: [
      weak('crush'),
      {
        name: 'Passion Flare',
        type: 'crush',
        trigger: 'dragon',
        stats: {min:[80, 96, 112, 128] },
        pom: pom_6,
      },
    ],
  },
  {
    name: 'Passion Dash',
    title: 'AphroditeRushTrait',
    type: 'dash',
    icon: 'assets/traits/Aphrodite_03_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>inflicts damage where you end up, inflicting<b>Weak.</b></div>' +
      `<div>▶ Dash Damage:<div><span>${fv(stats.min)}</span></div></div>`,
    mods: [{
      name: 'Passion Dash',
      type: 'effect',
      target: 'dash',
      stats: { name: 'Passion Dash', min: [20,24,28,32], radius: 180 },
      pom: pom_8,
    }],
    effects: [weak('dash')],
  },
  {
    name: "Aphrodite's Aid",
    title: 'AphroditeShoutTrait',
    type: 'call',
    icon: 'assets/traits/Aphrodite_04_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Call</b>fires a seeking projective that inflicts <b>Charm.</b></div>' +
      `<div>▶ Charm Duration:<div><span>${fv(stats.duration, null, 1)} Sec.</span></div></div>`,
    abilities: [
      { name: "Aphrodite's Aid", type: 'love', trigger: 'call' },
      { name: "Aphrodite's Aid - Max", type: 'love', trigger: 'call', stats: { min:2500 }, pom: pom_4 },
    ],
    effects: [{name: 'Charm', trigger: 'call', type: 'charm', stats: {duration:[5,5.5,6,6.5]}, pom: pom(0.1, 0.2) }],
  },
  {
    name: "Dying Lament",
    title: 'AphroditeDeathTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_08_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>When foes are slain, they damage <b>nearby</b> foes and inflict<b>Weak.</b></div>' +
      `<div>▶ Death Blast Damage:<div><span>${fv(stats.min,stats.max)}</span></div></div>`,
    effects: [
      {name: 'Dying Lament', trigger: 'slain', type: 'lament', stats: {min:[40,52,72,92], max:[40,60,80,100], radius:200}, pom: pom_6 },
      weak('lament'),
    ],
  },
  {
    name: "Wave of Despair",
    title: 'AphroditeRetaliateTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_09_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>After you take damage, damage nearby foes and inflict<b>Weak.</b></div>' +
      `<div>▶ Revenge Damage:<div><span>${fv(stats.min,stats.max)}</span></div></div>`,
    effects: [
      {name: 'Wave of Despair', trigger: 'revenge', type: 'despair', stats: {min:[50,65,90,115], max:[50,75,100,125], radius:700}, pom: pom_8 },
      weak('despair'),
    ],
  },
  {
    name: "Different League",
    title: 'ProximityArmorTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_07_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    description: (stats) =>
      "<div>Resist some damage from nearby foes' attacks.</div>" +
      `<div>▶ Reduced Damage from Foes:<div><span>${fp(stats.reduction, null, 1)}%</span></div></div>`,
    mods: [{
      target: 'coefficients',
      type: 'effect',
      name: 'Different League',
      stats: {reduction: [0.1, 0.125, 0.15, 0.175] },
      status: {target: 'foe', name: 'Nearby'},
      pom: pom_4,
    }],
  },
  {
    name: "Life Affirmation",
    title: 'HealthRewardBonusTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_11_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    description: (stats) =>
      `<div>Any&nbsp;<img src="/Apollo/assets/LifeUp_Small.png" />&nbsp;or&nbsp;<img src="/Apollo/assets/LifeRestore_Small.png" />&nbsp;chamber rewards are worth more.</div>` +
      `<div>▶ Reward Value:<div><span>+${fp(stats.life_bonus, null, 1)}%</span></div></div>`,
    mods: [{
      name: 'Life Affirmation',
      target: 'coefficients',
      type: 'effect',
      stats: { life_bonus: [0.3, 0.36, 0.42, 0.48] },
    }],
    feature: (stats) =>
      `<img src="/Apollo/assets/LifeUp_Small.png" />&nbsp;or&nbsp;<img src="/Apollo/assets/LifeRestore_Small.png" />&nbsp;chamber rewards are worth <span>${ fp(stats.life_bonus) }%</span> more.`
  },
  {
    name: 'Empty Inside',
    title: 'AphroditeDurationTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_05_Large.png',
    god: 'Aphrodite',
    prereqs: { Aphrodite: ['Passion Dash', 'Crush Shot', 'Heartbreak Strike', 'Heartbreak Flourish'] },
    rarity: 0,
    description: (stats) =>
      '<div>Your<b>Weak</b>effects have a longer duration.</div>' +
      `<div>▶ Weak Duration:<div><span>${fv(stats.duration, null, 1)} Sec.</span></div></div>`,
    mods: [
      { target: 'weak', type: 'effect', name: 'Empty Inside', stats: {duration: [5, 7.5, 10, 12.5]}, pom: pom_4 }
    ],
  },
  {
    name: 'Sweet Surrender',
    title: 'AphroditeWeakenTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_06_Large.png',
    god: 'Aphrodite',
    prereqs: { Aphrodite: ['Passion Dash', 'Crush Shot', 'Heartbreak Strike', 'Heartbreak Flourish'] },
    rarity: 0,
    description: (stats) =>
      '<div><b>Weak</b>afflicted foes are also more susceptible to damage.</div>' +
      `<div>▶ Damage vs. Weak:<div><span>+${fp(stats.mult_min, stats.mult_max)}%</span></div></div>`,
    mods: [{
      type: 'meta',
      target: 'Weak',
      stats: {mult_min: [0.1, 0.13, 0.2, 0.25], mult_max: [0.1, 0.15, 0.25, 0.27]},
      pom: pom_4,
    }],
  },
  {
    name: 'Broken Resolve',
    title: 'AphroditePotencyTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_12_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    level: 1,
    prereqs: { Aphrodite: ['Passion Dash', 'Crush Shot', 'Heartbreak Strike', 'Heartbreak Flourish'] },
    description: (stats) =>
      '<div>Your<b>Weak</b>effects are more potent.</div>' +
      `<div>▶ Weak Damage Reduction:<div><span>+${fp(stats.reduction, null, 1)}%</span></div></div>`,
    mods: [
      {
        type: 'meta',
        target: 'Weak',
        stats: { reduction: [0.1, 0.125, 0.15, 0.175] },
        pom: pom_4,
      },
      {
        type: 'effect',
        target: 'weak',
        stats: { reduction: [0.1, 0.125, 0.15, 0.175] },
        pom: pom_4,
      }
    ],
  },
  {
    name: 'Blown Kiss',
    title: 'AphroditeRangedBonusTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_13_Large.png',
    god: 'Aphrodite',
    rarity: 0,
    prereqs: { Aphrodite: ['Crush Shot'] },
    description: (stats) =>
      '<div>Your<b>Cast</b>shoots farther and is stronger against undamaged foes.</div>' +
      `<div>▶ First-hit Bonus:<div><span>${fp(stats.first)}</span></div></div>`,
    mods: [
      {
        type: 'effect',
        target: 'cast',
        stats: { range: 1 },
      },
      {
        type: 'effect',
        target: 'cast',
        stats: { first: [0.5, 0.75, 1.0, 1.25] },
        status: { target: 'foe', name: 'First Hit' },
      },
    ],
  },
  {
    name: 'Unhealthy Fixation',
    title: 'CharmTrait',
    type: 'secondary',
    icon: 'assets/traits/Aphrodite_10_Large.png',
    god: 'Aphrodite',
    prereqs: {
      ability: ['Passion Dash', 'Crush Shot', 'Heartbreak Strike', 'Heartbreak Flourish'],
      secondary: ['Empty Inside', 'Sweet Surrender', 'Broken Resolve'],
    },
    rarity: 4,
    description: (stats) =>
      `<div>Your<b>Weak</b>effects also have a<span>${ fp(0.15) }%</span>chance to<b>Charm</b>foes.</div>` +
      `<div>▶ Charm Duration<div><span>${ fv(4) } Sec.</span></div></div>`,
    effects: [{
      name: 'Charm',
      trigger: 'weak',
      type: 'charm',
      stats: { duration: 4, chance: 0.15 },
    }],
  },
]