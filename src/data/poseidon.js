import { fv, fp, pom, pom_2, pom_4, pom_6 } from './util'

export default [
  {
    name: 'Poseidon',
    type: 'god',
    icon: 'assets/gods/Poseidon.png',
  },
  {
    name: 'Tempest Strike',
    type: 'attack',
    icon: 'assets/traits/Poseidon_01_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Attack</b>deals more damage and knocks foes away.</div>' +
      `<div>▶ Attack Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    mods: [{
      name: 'Tempest Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_min: [0.3, 0.39, 0.54, 0.69], mult_max: [0.3, 0.45, 0.6, 0.75], knockback: true },
      pom: pom_4,
    },],
  },
  {
    name: 'Tempest Flourish',
    type: 'special',
    icon: 'assets/traits/Poseidon_secondary_attack.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>deals more damage and knocks foes away.</div>' +
      `<div>▶ Special Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    mods: [{
      name: 'Tempest Flourish',
      type: 'effect',
      target: 'special',
      stats: { mult_min: [0.7, 0.91, 1.26, 1.61], mult_max: [0.7, 1.05, 1.4, 1.75], knockback: true },
      pom: pom_4,
    },],
  },
  {
    name: 'Flood Shot',
    type: 'cast',
    icon: 'assets/traits/Poseidon_02_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    exclude: ['Aegis - Aspect of Beowolf'],
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes in an area and knocks them away.</div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{name: 'Flood Shot', type: 'flood', trigger: 'cast', stats: { min: [60,72,84,96], radius: 500, knockback: true, lodge: true }, pom: pom_6}],
  },
  {
    name: 'Flood Flare',
    type: 'cast',
    icon: 'assets/traits/Poseidon_02_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes around you and knocks them away.</div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{name: 'Flood Shot', type: 'flood', trigger: 'cast', stats: { min: [60,72,84,96], radius: 500, knockback: true }, pom: pom_6}],
  },
  {
    name: 'Tidal Dash',
    type: 'dash',
    icon: 'assets/traits/Poseidon_03_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>damages foes in an area and knocks them away.</div>' +
      `<div>▶ Dash Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Tidal Dash',
      type: 'wave',
      trigger: 'dash',
      stats: { min: [ 35, 42, 49, 56], knockback: true },
      pom: pom_6,
    },],
  },
  {
    name: "Poseidon's Aid",
    type: 'call',
    icon: 'assets/traits/Poseidon_04_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Your<b>Call</b>makes you surge into foes while<b>Impervious</b>for <b>${ stats.duration } Sec.</b></div>` +
      `<div>▶ Impact Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      {
        name: "Poseidon's Aid",
        type: 'surge',
        trigger: 'call',
        stats: { min: [ 250, 300, 350, 400], duration: 1.2, knockback: true },
        pom: pom_4,
      },
      {
        name: "Poseidon's Aid - Max",
        type: 'surge',
        trigger: 'call',
        stats: { min: [ 250, 300, 350, 400], duration: 7.2, knockback: true },
        pom: pom_4,
      },
    ],
  },
  {
    name: "Typhoon's Fury",
    type: 'secondary',
    icon: 'assets/traits/Poseidon_05_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    prereqs: { Poseidon: ['Tempest Strike', 'Tidal Dash', 'Flood Shot', 'Tempest Flourish', "Poseidon's Aid"] },
    description: (stats) =>
      `<div>You deal more damage when slamming foes into barriers.</div>` +
      `<div>▶ Slam Damage:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: "Typhoon's Fury",
      type: 'effect',
      target: 'slam',
      stats: { mult_base: [2, 2.75, 3.5, 4.25] },
      pom: pom_4,
    }],
  },
  {
    name: 'Hydraulic Might',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_14_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Your<b>Attack</b>and<b>Special</b>are stronger the first<b>10 Sec.</b>of Encounters.</div>` +
      `<div>▶ Initial Damage Bonus:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: 'Hydraulic Might',
      type: 'effect',
      target: ['attack', 'special'],
      stats: { mult_base: [1.3, 1.34, 1.67, 2] },
      status: { name: 'Hydraulic Might', target: 'player' },
      pom: pom_2,
    }],
  },
  {
    name: "Ocean's Bounty",
    type: 'secondary',
    icon: 'assets/traits/Poseidon_09_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Any<b>Chamber Rewards</b>are worth more.</div>` +
      `<div>▶ Reward Bonus:<div><span>+${ fp(stats.reward) }%</span></div></div>`,
    feature: (stats) =>
      `Chamber rewards are worth <span>+${ fp(stats.reward) }%</span>`,
    mods: [{
      name: "Ocean's Bounty",
      type: 'reward',
      target: 'coefficients',
      stats: { reward: [ 0.5, 0.55, 0.6, 0.65 ] },
      pom: pom_4,
    }],
  },
  {
    name: 'Sunken Treasure',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_06_Large.png',
    god: 'Poseidon',
    rarity: 0,
    description: (stats) =>
      `<div>Gain an assortment of<b>Goodies.</b></div>`,
  },
  {
    name: 'Razor Shoals',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_11_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    prereqs: { Poseidon: ['Flood Shot', "Poseidon's Aid", 'Tempest Flourish', 'Tempest Strike', 'Tidal Dash'] },
    description: (stats) =>
      `<div>Using knockback effects also<b>Ruptures</b>foes.</div>` +
      `<div>▶ Rupture Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [
      {
        name: 'Razor Shoals',
        type: 'rupture',
        trigger: 'knockback',
        stats: { min: [ 10, 15, 20, 25 ], duration: 3, interval: 0.2 },
        pom: pom(0.6, 0.2),
      },
    ],
  },
  {
    name: 'Boiling Point',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_10_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    prereqs: { Call: ["Aphrodite's Aid", "Ares' Aid", "Artemis' Aid", "Athena's Aid", "Demeter's Aid", "Dionysus' Aid", "Poseidon's Aid", "Zeus' Aid"] },
    description: (stats) =>
      `<div>Your<b>God Gauge</b>charges faster when you take damage.</div>` +
      `<div>▶ Faster Gauge Gain When Hit:<div><span>+${ fp(stats.gauge_hit) }%</span></div></div>`,
    feature: (stats) =>
      `<b>God Gauge</b> charges <span>${ fp(stats.gauge_hit) }%</span> faster when you take damage.`,
    mods: [{
      name: 'Boiling Point',
      type: 'effect',
      target: 'coefficients',
      stats: { gauge_hit: [0.4, 0.5, 0.6, 0.7] },
      pom: pom_4,
    },],
  },
  {
    name: 'Breaking Wave',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_08_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    prereqs: { Poseidon: ['Flood Shot', "Poseidon's Aid", 'Tempest Flourish', 'Tempest Strike', 'Tidal Dash'] },
    description: (stats) =>
      `<div>Slamming foes into walls or corners creates a watery blast in the area.</div>` +
      `<div>▶ Stun Duration:<div><span>${ fv(stats.duration, null, 1) }</span></div></div>`,
    effects: [{
      name: 'Stun',
      type: 'watery',
      trigger: 'slam',
      stats: { duration: [3,4.5,6,7.5] },
      pom: pom_4,
    },],
  },
  {
    name: 'Wave Pounding',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_12_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    prereqs: { Poseidon: ['Flood Shot', "Poseidon's Aid", 'Tempest Flourish', 'Tempest Strike', 'Tidal Dash'] },
    description: (stats) =>
      `<div>Your boons with<b>Knockback</b>effects deal bonus damage to bosses.</div>` +
      `<div>▶ Bonus Damage:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [
      {
        name: 'Wave Pounding',
        type: 'meta',
        target: ['Tempest Strike', 'Tempest Flourish', 'Flood Strike', 'Tidal Dash' ],
        stats: { mult_base: [0.2, 0.3, 0.4, 0.5] },
        status: { name: 'Boss', target: 'foe' },
        pom: pom_4,
      },
    ],
  },
  {
    name: 'Rip Current',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_15_Large.png',
    god: 'Poseidon',
    rarity: 0,
    level: 1,
    prereqs: { Poseidon: ["Poseidon's Aid"] },
    description: (stats) =>
      `<div>Your<b>Call</b>pulls in foes and the effect lasts longer.</div>` +
      `<div>▶ Duration<div><span>+${ fv(stats.duration, null, 1) } Sec.</span></div></div>`,
    feature: (stats) =>
      `Your<b class="Poseidon">Call</b>pulls foes in.`,
    mods: [{
      name: 'Rip Current',
      type: 'effect',
      target: "surge",
      stats: { duration: [1, 1.25, 1.5, 1.75] },
      pom: pom_2,
    },],
  },
  {
    name: 'Huge Catch',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_13_Large.png',
    god: 'Poseidon',
    rarity: 4,
    prereqs: { Poseidon: ["Ocean's Bounty", 'Sunken Treasure'] },
    threshold: 2,
    description: (stats) =>
      `<div>You have a greater chance to find a<b>Fishing Point</b>in each<b>Chamber.</b></div>` +
      `<div>▶ Fish Spawn Chance:<div><span>+20%</span></div></div>`,
    feature: (stats) =>
      `<span>+20%</span> Fish spawn chance.`,
    mods: [{
      name: 'Huge Catch',
      type: 'effect',
      target: 'coefficients',
      stats: { fish: 0.2 }
    },]
  },
  {
    name: 'Second Wave',
    type: 'secondary',
    icon: 'assets/traits/Poseidon_07_Large.png',
    god: 'Poseidon',
    rarity: 4,
    prereqs: { Secondary: ['Breaking Wave', "Typhoon's Fury"], Primary: ['Flood Shot', "Poseidon's Aid", 'Tempest Flourish', 'Tempest Strike', 'Tidal Dash'] },
    description: (stats) =>
      `<div>Your <b>knockback</b>effects shove foes a second time after the first.</div>` +
      `<div>▶ Delay:<div><span>0.7 Sec.</span></div></div>`,
    effects: [
      {
        name: 'Second Wave',
        type: 'second wave',
        trigger: 'wave',
        stats: { knockback: true },
      },
      {
        name: 'Second Wave',
        type: 'second wave',
        trigger: 'surge',
        stats: { knockback: true },
      },
    ],
  },
]