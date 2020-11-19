import { beowolf_cast_exclusions, fv, fp, pom, pom_3, pom_4, pom_6, pom_8 } from './util'

const doom_status = { name: 'Doom', target: 'foe' }

export default [
  {
    name: 'Ares',
    type: 'god',
    icon: 'assets/gods/Ares.png',
  },
  {
    name: 'Curse of Agony',
    type: 'attack',
    icon: 'assets/traits/Ares_01_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Attack</b>inflicts<b>Doom.</b></div>' +
      `<div>▶ Curse Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [
      {
        name: 'Doom',
        type: 'doom',
        trigger: 'attack',
        stats: { min: [ 50, 75, 100, 125 ], duration: 1.1 },
        status: doom_status,
        pom: pom_6,
      },
    ],
  },
  {
    name: 'Curse of Pain',
    type: 'special',
    icon: 'assets/traits/Ares_secondary_attack.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>inflicts<b>Doom.</b></div>' +
      `<div>▶ Curse Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Doom',
      type: 'doom',
      trigger: 'special',
      stats: { min: [60,80,100,120], duration: 1.1 },
      status: doom_status,
      pom: pom(0.66)
    }],
  },
  {
    name: 'Slicing Shot',
    type: 'cast',
    icon: 'assets/traits/Ares_02_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    exclude: [ 'Aegis - Aspect of Beowolf' ],
    description: (stats) =>
      '<div>Your<b>Cast</b>sends a<b>Blade Rift</b>hurling ahead.</div>' +
      `<div>▶ Rift Damage per Hit:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Slicing Shot',
      type: 'rift',
      trigger: 'cast',
      stats: { min: [20,22,24,26], duration: 4, interval: 0.1, radius: 150 },
      status: { target: 'foe', name: 'Blade Rift Hits' },
      pom: pom(0.2, 0.1),
    }],
    mods: [{
      name: 'Slicing Shot Hits',
      type: 'effect',
      target: 'Slicing Shot',
      stats: { count: 1 },
      status: { target: 'foe', name: 'Blade Rift Hits' },
    }]
  },
  {
    name: 'Slicing Flare',
    type: 'cast',
    icon: 'assets/traits/Ares_02_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    exclude: beowolf_cast_exclusions,
    description: (stats) =>
      '<div>Your<b>Cast</b>sends a large<b>Blade Rift</b>hurling ahead.</div>' +
      `<div>▶ Rift Damage per Hit:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Slicing Flare',
      type: 'rift',
      trigger: 'dragon',
      stats: { min: [30,36,42,48], duration: 4, interval: 0.1, radius: 200 },
      status: { target: 'foe', name: 'Blade Rift Hits' },
      pom: pom(0.2, 0.05),
    }],
    mods: [{
      name: 'Slicing Flare Hits',
      type: 'effect',
      target: 'Slicing Flare',
      stats: { count: 1 },
      status: { target: 'foe', name: 'Blade Rift Hits' },
    }]
  },
  {
    name: 'Blade Dash',
    type: 'dash',
    icon: 'assets/traits/Ares_03_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>creates a<b>Blade Rift</b>where you started.</div>' +
      `<div>▶ Rift Damage per Hit:<div><span>${ fv(stats.min) }</span></div></div>`,
    mods: [{
      name: 'Blade Dash Hits',
      type: 'effect',
      target: 'Blade Dash',
      stats: { count: 1 },
      status: { target: 'foe', name: 'Blade Rift Hits' },
    }],
    effects: [{
      name: 'Blade Dash',
      type: 'rift',
      trigger: 'dash',
      stats: { min:[10,12,14,16], duration: 0.7, interval: 0.1, radius:150 },
      status: { target: 'foe', name: 'Blade Rift Hits' },
      pom: pom(0.6, 0.2),
    }],
  },
  {
    name: "Ares' Aid",
    type: 'call',
    icon: 'assets/traits/Ares_04_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Your<b>Call</b>turns you into an<b>Impervious Blade Rift</b>for <b>${fv(stats.duration)} Sec.</b></div>` +
      `<div>▶ Rift Damage per Hit:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      {
        name: "Ares' Aid",
        type: 'rift',
        trigger: 'call',
        stats: { duration: 1.2, min: [ 30, 37.5, 45, 52.5], interval: 0.1, radius: 150 },
        status: { target: 'foe', name: 'Blade Rift Hits' },
        pom: pom(0.2, 0.05),
      },
      {
        name: "Ares' Aid - Max",
        type: 'rift',
        trigger: 'call',
        stats: { duration: 6, min: [ 30, 37.5, 45, 52.5], interval: 0.1, radius: 150 },
        status: { target: 'foe', name: 'Blade Rift Hits' },
        pom: pom(0.2, 0.05),
      }
    ],
    mods: [
      {
        name: "Ares' Aid Hits",
        type: 'effect',
        target: ["Ares' Aid", "Ares' Aid - Max"],
        stats: { count: 1 },
        status: { target: 'foe', name: 'Blade Rift Hits' },
      }
    ],
  },
  {
    name: 'Curse of Vengeance',
    type: 'secondary',
    icon: 'assets/traits/Ares_05_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>After you take damage, inflict<b>Doom</b>on surrounding foes.</div>' +
      `<div>▶ Revenge Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Doom',
      trigger: 'revenge',
      type: 'doom',
      stats: { min:[100,120,140,160], duration: 1.1 },
      status: doom_status,
      pom: pom_8,
    }],
  },
  {
    name: 'Urge to Kill',
    type: 'secondary',
    icon: 'assets/traits/Ares_06_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Attack</b>and<b>Cast</b>deal more damage.</div>' +
      `<div>▶ Attack and Cast Damage:<div><span>+${fp(stats.mult_base)}%</span></div></div>`,
    mods: [
      {
        name: 'Urge to Kill',
        type: 'effect',
        target: 'attack',
        stats: { mult_base: [0.1, 0.13, 0.16, 0.19] },
        pom: pom_4,
      },
      {
        name: 'Urge to Kill',
        type: 'effect',
        target: 'cast',
        stats: { mult_base: [0.1, 0.13, 0.16, 0.19] },
        pom: pom_4,
      },
    ],
  },
  {
    name: 'Battle Rage',
    type: 'secondary',
    icon: 'assets/traits/Ares_12_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>After slaying a foe, your next <b>Attack</b>or<b>Special</b>deals more damage.</div>' +
      `<div>▶ Damage Bonus:<div><span>+${fp(stats.mult_base)}%</span></div></div>`,
    mods: [
      {
        name: 'Battle Rage',
        type: 'effect',
        target: ['attack', 'special'],
        stats: { mult_base: [ 1, 1.5, 2, 2.5 ] },
        status: { target: 'player', name: 'Battle Rage' },
        pom: pom_3,
      },
    ],
  },
  {
    name: 'Blood Frenzy',
    type: 'secondary',
    icon: 'assets/traits/Ares_14_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>After using<b>Death Defiance</b>, deal more damage that encounter.</div>' +
      `<div>▶ Damage Bonus<div><span>+${fp(stats.mult_base)}%</span></div></div>`,
    mods: [
      {
        name: 'Blood Frenzy',
        type: 'effect',
        target: 'coefficients',
        stats: { mult_base: [ 0.15, 0.225, 0.3, 0.375], },
        status: { target: 'player', name: 'Blood Frenzy' },
        pom: pom_4,
      },
    ],
  },
  {
    name: 'Black Metal',
    type: 'secondary',
    icon: 'assets/traits/Ares_07_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    prereqs: { Ares: ["Ares' Aid", 'Blade Dash', 'Slicing Flare', 'Slicing Shot'] },
    description: (stats) =>
      '<div>Your<b>Blade Rift</b>powers deal damage in a wider area.</div>' +
      `<div>▶ Bonus Area of Effect:<div><span>+${fp(stats.multiply_radius)}%</span></div></div>`,
    mods: [{
      name: 'Black Metal',
      type: 'effect',
      target: 'rift',
      stats: { multiply_radius: [0.3, 0.33, 0.36, 0.39] },
      pom: pom_4,
    }],
  },
  {
    name: 'Engulfing Vortex',
    type: 'secondary',
    icon: 'assets/traits/Ares_08_Large.png',
    god: 'Ares',
    rarity: 0,
    prereqs: { Ares: ["Ares' Aid", 'Blade Dash', 'Slicing Flare', 'Slicing Shot'] },
    description: (stats) =>
      '<div>Your<b>Blade Rift</b>effects last longer and pull foes in.</div>' +
      `<div>▶ Rift Duration<div><span>+${fp(stats.duration)}%</span></div></div>`,
    feature: (stats) => `<b class="Ares">Blade Rifts</b> pull foes in.`,
    mods: [{
      name: 'Engulfing Vortex',
      type: 'effect',
      target: 'rift',
      stats: { duration: [0.2, 0.3, 0.4, 0.5] },
    }],
  },
  {
    name: 'Dire Misfortune',
    type: 'secondary',
    icon: 'assets/traits/Ares_11_Large.png',
    god: 'Ares',
    rarity: 0,
    prereqs: { Ares: [ 'Curse of Agony', 'Curse of Pain' ] },
    description: (stats) =>
      '<div>Your<b>Doom</b>effects deal more damage when applied multiple times.</div>' +
      `<div>▶ Bonus Damage per Curse:<div><span>${ fv(stats.min) }</span></div></div>`,
    mods: [
      {
        name: 'Dire Misfortune Offset',
        type: 'effect',
        target: 'doom',
        stats: { min: -10 },
        status: { ...doom_status, max_stacks: 1 },
      },
      {
        name: 'Dire Misfortune',
        type: 'effect',
        target: 'doom',
        stats: { min: [10, 12, 14, 16], count: 1 },
        status: { ...doom_status, max_stacks: 100 },
      },
    ],
  },
  {
    name: 'Impending Doom',
    type: 'secondary',
    icon: 'assets/traits/Ares_13_Large.png',
    god: 'Ares',
    rarity: 0,
    level: 1,
    prereqs: { Ares: ['Curse of Agony', 'Curse of Pain', 'Curse of Vengeance'] },
    description: (stats) =>
      '<div>Your<b>Doom</b>effects deal more damage, after <b>+0.5</b>Sec.</div>' +
      `<div>▶ Damage Bonus:<div><span>+${fp(stats.mult_base)}%</span></div></div>`,
    mods: [{
      name: 'Impending Doom',
      type: 'effect',
      target: 'doom',
      stats: { mult_base: [0.6, 0.66, 0.72, 0.78], duration: 0.5 },
      pom: pom_4,
    }],
  },
  {
    name: 'Vicious Cycle',
    type: 'secondary',
    icon: 'assets/traits/Ares_09_Large.png',
    god: 'Ares',
    rarity: 4,
    prereqs: { Ares: ['Black Metal', 'Engulfing Vortex'] },
    description: (stats) =>
      '<div>Your<b>Blade Rift</b>effects deal more damage for each consecutive hit.</div>' +
      `<div>▶ Damage increase per hit:<div><span>2</span></div></div>`,
    feature: (stats) => `<b class="Ares">Blade Rifts</b> deal <span>+2</span> damage for each consecutive hit.`,
    mods: [
      {
        name: 'Vicious Cycle',
        type: 'effect',
        target: 'rift',
        stats: { vicious_cycle: true },
      },
    ],
  },
]