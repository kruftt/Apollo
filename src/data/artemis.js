import { beowolf_cast_exclusions, fv, fp, pom, pom_2, pom_4, pom_6 } from './util'

export default [
  {
    name: 'Artemis',
    type: 'god',
    icon: 'assets/gods/Artemis.png',
  },
  {
    name: 'Deadly Strike',
    type: 'attack',
    icon: 'assets/traits/Artemis_01_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Attack</b>is stronger, with<span>+15%</span>chance to deal<b>Critical</b>damage.</div>' +
      `<div>▶ Attack Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    mods: [{
      name: 'Deadly Strike',
      type: 'effect',
      target: 'attack',
      stats: { crit: 0.15, mult_min: [0.2,0.26,0.36,0.46], mult_max: [0.2,0.3,0.4,0.5] },
      pom: pom_4,
    }],
  },
  {
    name: 'Deadly Flourish',
    description: (stats) =>
      '<div>Your<b>Special</b>has a<span>20%</span>chance to do <b>critical</b> damage.</div>' +
      `<div>▶ Special Damage:<div><span>+${fp(stats.mult_min, stats.mult_max)}%<span></div></div>`,
    type: 'special',
    icon: 'assets/traits/Artemis_secondary_attack.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    mods: [{
      name: 'Deadly Flourish',
      type: 'effect',
      target: 'special',
      stats: {
        mult_min: [ 0.4, 0.52, 0.72, 0.92 ],
        mult_max: [ 0.4, 0.6, 0.8, 1.0 ],
        crit: [ 0.2, 0.2, 0.2, 0.2 ],
      },
      pom: pom_4,
    }],
  },
  {
    name: 'True Shot',
    type: 'cast',
    icon: 'assets/traits/Artemis_02_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    exclude: [ 'Aegis - Aspect of Beowolf' ],
    description: (stats) =>
      '<div>Your<b>Cast</b>seeks foes, with a 10% chance to deal<b>Critical</b>damage.</div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'True Shot',
      type: 'arrow',
      trigger: 'cast',
      stats: { min: [70, 80, 90, 100], crit: 0.1, lodge: true },
      pom: pom_6,
    }],
  },
  {
    name: "Hunter's Flare",
    type: 'cast',
    icon: 'assets/traits/Artemis_02_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    exclude: beowolf_cast_exclusions,
    description: (stats) =>
    '<div>Your<b>Cast</b>damages foes around you, with a 10% <b>Critical</b> chance.</div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: "Hunter's Flare",
      type: 'hunters',
      trigger: 'dragon',
      stats: { min: [55, 62.975, 70.95, 78.925], crit: 0.1, lodge: true },
      pom: pom_6,
    }],
  },
  {
    name: 'Hunter Dash',
    type: 'dash',
    icon: 'assets/traits/Artemis_03_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash-Strike</b>deals more damage.</div>' +
      `<div>▶ Dash Attack Damage:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: 'Hunter Dash',
      type: 'effect',
      target: 'dashAttack',
      stats: { mult_base: [0.5,0.6,0.7,0.8] },
      pom: pom_2,
    }],
  },
  {
    name: "Artemis' Aid",
    type: 'call',
    icon: 'assets/traits/Artemis_04_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Call</b>fires a seeking arrow with +35%<b>Critical</b>chance.</div>' +
      `<div>▶ Base Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      {
        name: "Artemis' Aid",
        type: 'arrow',
        trigger: 'call',
        stats: { min: [100,110,120,130] },
        pom: pom_4,
      },
      {
        name: "Artemis' Aid - Max",
        type: 'arrow',
        trigger: 'call',
        stats: { min: [100,110,120,130], count: 10 },
        pom: pom_4,
      },
    ],
  },
  {
    name: 'Pressure Points',
    type: 'secondary',
    icon: 'assets/traits/Artemis_08_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Any damage you deal has a chance to be <b>Critical.</b></div>` +
      `<div>Bonus Critical Chance:<div><span>+${ fp(stats.crit) }%</span></div></div>`,
    mods: [{
      name: 'Pressue Points',
      type: 'effect',
      target: 'coefficients',
      stats: { crit: [ 0.02, 0.03, 0.04, 0.05 ] },
      pom: pom(0.4, 0.333333)
    }],
  },
  {
    name: 'Exit Wounds',
    type: 'secondary',
    icon: 'assets/traits/Artemis_10_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    prereqs: { Cast: [ 'Crush Shot', 'Electric Shot', 'Flood Shot', 'Phalanx Shot', 'True Shot' ] },
    description: (stats) =>
      '<div>Foes take damage when your<b>Bloodstone</b>are dislodged.</div>' +
      `<div>▶ Dislodge Damage<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Exit Wounds',
      type: 'exit',
      trigger: 'dislodge',
      stats: { min: [100,120,140,160] },
      pom: pom_4,
    }],
  },
  {
    name: 'Hide Breaker',
    type: 'secondary',
    icon: 'assets/traits/Artemis_09_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    prereqs: { Artemis: [ "Artemis' Aid", 'Deadly Flourish', 'Deadly Strike', 'Pressure Points', 'True Shot' ] },
    description: (stats) =>
      '<div>Your<b>Critical</b>effects deal even more damage to <b>Armor.</b></div>' +
      `<div>▶ Critical Damage Bonus:<div><span>+${ fp(stats.mult_min, stats.mult_max ) }</span></div></div>`,
    mods: [{
      name: 'Hide Breaker',
      type: 'effect',
      target: 'crit',
      stats: { mult_min: [2,2.6,3.6,4.6], mult_max: [2,3,4,5] },
      status: { target: 'foe', name: 'Armored' },
      pom: pom_4,
    }],
  },
  {
    name: 'Clean Kill',
    type: 'secondary',
    icon: 'assets/traits/Artemis_05_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    prereqs: { Artemis: ["Artemis' Aid", 'Deadly Flourish', 'Deadly Strike', 'Pressure Points', 'True Shot'] },
    description: (stats) =>
      '<div>Your<b>Critical</b>effects deal even more damage.</div>' +
      `<div>▶ Critical Damage:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: 'Clean Kill',
      type: 'effect',
      target: 'crit',
      stats: { mult_base: [0.15, 0.225, 0.3, 0.375] },
      pom: pom(0.66, 0.2),
    }],
  },
  {
    name: 'Hunter Instinct',
    type: 'secondary',
    icon: 'assets/traits/Artemis_13_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    prereqs: {Artemis: ['Deadly Flourish', 'Deadly Strike', 'Pressure Points', 'True Shot' ]},
    description: (stats) =>
      '<div>Your<b>God Gauge</b>charges faster when you deal<b>Critical</b>damage.</div>' +
      `<div>▶ Faster Gauge Gain on Critical:<div><span>+${ fp(stats.gauge_crit) }%</span></div></div>`,
    mods: [{
      name: 'Hunter Instinct',
      type: 'effect',
      target: 'coefficients',
      stats: { gauge_crit: [0.25, 0.3, 0.35, 0.4] },
      pom: pom_4,
    }],
  },
  {
    name: "Hunter's Mark",
    type: 'secondary',
    icon: 'assets/traits/Artemis_14_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    prereqs: { Artemis: ["Artemis' Aid", "Deadly Flourish", 'Deadly Strike', 'Hunter Dash', 'Pressure Points', 'True Shot'] },
    description: (stats) =>
      '<div>After you deal<b>Critical</b>damage to a foe, a foe near it is<b>Marked.</b></div>' +
      `<div>▶ Bonus Crit Chance:<div><span>+${ fp(stats.crit_min, stats.crit_max) }%</span></div></div>`,
    mods: [
      {
        name: 'Marked',
        type: 'effect',
        target: 'coefficients',
        stats: { crit_min: [0.3, 0.39, 0.6, 0.75], crit_max: [0.3, 0.45, 0.75, 0.81]},
        status: { target: 'foe', name: 'Marked' },
        pom: pom_4,
      }
    ],
  },
  {
    name: 'Support Fire',
    type: 'secondary',
    icon: 'assets/traits/Artemis_12_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    prereqs: { Artemis: ["Artemis' Aid", "Deadly Flourish", 'Deadly Strike', 'Hunter Dash', 'Pressure Points', 'True Shot'] },
    description: (stats) =>
      '<div>After you<b>Cast,</b> or hit with an<b>Attack</b>or<b>Special</b>, fire a seeking arrow.</div>' +
      `<div>▶ Projectile Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [
      {name:'Support Fire',type:'arrow',trigger:'cast',stats:{min:[10,12,14,16]}},
      {name:'Support Fire',type:'arrow',trigger:'attack',stats:{min:[10,12,14,16]}},
      {name:'Support Fire',type:'arrow',trigger:'special',stats:{min:[10,12,14,16]}},
    ],
    pom: pom_2
  },
  {
    name: 'Fully Loaded',
    type: 'secondary',
    icon: 'assets/traits/Artemis_07_Large.png',
    god: 'Artemis',
    rarity: 4,
    prereqs: { Artemis: ['Exit Wounds', 'Pressure Points', 'Support Fire'] },
    threshold: 2,
    description: (stats) =>
      '<div>Gain extra<b>Bloodstone</b>for your<b>Cast.</b></div>' +
      `<div>▶ Max Ammo:<div><span>+${ fv(stats.ammo) }</span></div></div>`,
    mods: [{name: 'Fully Loaded', type: 'effect', target: 'player', stats: { ammo: 2 }}],
  },
]