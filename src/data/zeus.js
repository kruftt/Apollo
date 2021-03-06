import { beowolf_cast_exclusions, fv, fp, pom, pom_4, pom_6, pom_8 } from './util'

export default [
  {
    name: 'Zeus',
    type: 'god',
    icon: 'assets/gods/Zeus.png',
  },

  {
    name: 'Lightning Strike',
    type: 'attack',
    title: 'ZeusWeaponTrait',
    description: (stats) =>
      '<div>Your<b>Attack</b>emits chain-lightning when you damage a foe.</div>' +
      `<div>Lightning Damage:<div><span>${fv(stats.min)}</span></div></div>`,
    god: 'Zeus',
    icon: 'assets/traits/Zeus_04_Large.png',
    rarity: 0,
    level: 1,
    effects: [
      {
        name: 'Chain Lightning',
        type: 'chain',
        trigger: 'attack',
        stats: { min: [10, 12.5, 15, 20] },
        pom: pom_4,
      },
    ],
  },
  {
    name: 'Thunder Flourish',
    title: 'ZeusSecondaryTrait',
    type: 'special',
    icon: 'assets/traits/Zeus_secondary_attack.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Your<b>Special</b>causes a lightning bolt to strike nearby foes.</div>` +
      `<div>▶ Lightning Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Lightning Bolt',
      type: 'bolt',
      trigger: 'special',
      stats: { min: [30, 37.5, 45, 60], radius: 200 },
      pom: pom_4,
    }],
  },
  {
    name: 'Electric Shot',
    title: 'ZeusRangedTrait',
    type: 'cast',
    icon: 'assets/traits/Zeus_05_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    exclude: ['Aegis - Aspect of Beowolf'],
    description: (stats) =>
      `<div>Your<b>Cast</b>is a burst of chain-lightning that bounces between foes.</div>` +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Electric Shot',
      type: 'chain',
      trigger: 'cast',
      stats: { min: [60, 70, 81, 90] },
      pom: pom_4,
    }],
    mods: [{
      name: 'Electric Shots',
      type: 'effect',
      target: 'Electric Shot',
      stats: { count: 1 },
      status: { name: 'Electric Shot Bounces', target: 'foe', min_stacks: 1, max_stacks: 5 },
    }]
  },
  {
    name: 'Thunder Flare',
    title: 'ShieldLoadAmmo_ZeusRangedTrait',
    type: 'cast',
    icon: 'assets/traits/Zeus_05_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    exclude: beowolf_cast_exclusions,
    description: (stats) =>
      `<div>Your<b>Cast</b>causes a lightning bolt to strike nearby foes.</div>` +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Thunder Flare',
      type: 'bolt',
      trigger: 'dragon',
      stats: { min: [60, 72, 84, 96] },
      pom: pom_4,
    },],
  },
  {
    name: 'Thunder Dash',
    title: 'ZeusRushTrait',
    type: 'dash',
    icon: 'assets/traits/Zeus_06_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Your<b>Dash</b>causes a lightning bolt to strike nearby foes.</div>` +
      `<div>▶ Lightning Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Lightning Bolt',
      type: 'bolt',
      trigger: 'dash',
      stats: { min: [10, 13.3, 16.6, 20], radius: 200 },
      pom: pom_8,
    },],
  },
  {
    name: "Zeus' Aid",
    title: 'ZeusShoutTrait',
    type: 'call',
    icon: 'assets/traits/Zeus_07_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>Your<b>Call</b>makes lightning strike nearby foes repeatedly for<b>1.5 Sec.</b></div>` +
      `<div>▶ Lightning Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      {
        name: "Zeus' Aid",
        type: 'bolt',
        trigger: 'call',
        stats: { min: [60, 66, 72, 84], duration: 1.5, interval: 0.2 },
        pom: pom_4,
      },
      {
        name: "Zeus' Aid - Max",
        type: 'bolt',
        trigger: 'call',
        stats: { min: [60, 66, 72, 84], duration: 9, interval: 0.2 },
        pom: pom_4,
      },
    ],
  },
  {
    name: "Heaven's Vengeance",
    title: 'RetaliateWeaponTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_01_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>After you take damage, your foe is struck by lightning.</div>` +
      `<div>▶ Revenge Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: "Heaven's Vengeance",
      type: 'bolt',
      trigger: 'revenge',
      stats: { min: [80,104,144,184], max: [80,120,160,200] },
      pom: pom_8,
    },],
  },
  {
    name: 'Lightning Reflexes',
    title: 'PerfectDashBoltTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_15_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    description: (stats) =>
      `<div>After you<b>Dash</b>just before getting hit, a bolt strikes a nearby foes.</div>` +
      `<div>▶ Lightning Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Lightning Reflexes',
      type: 'bolt',
      trigger: 'dash',
      stats: { min: [20,30,40,50] },
      pom: pom(0.5),
    },],
  },
  {
    name: 'Storm Lightning',
    title: 'ZeusBonusBounceTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_03_Large.png',
    god: 'Zeus',
    rarity: 0,
    prereqs: { Zeus: ['Electric Shot', 'Lightning Strike']},
    description: (stats) =>
      `<div>Your chain-lightning effects bounce more times before expiring.</div>` +
      `<div>▶ Lightning Bounces:<div><span>+${ fv(stats.bounces) }</span></div></div>`,
    mods: [{
      name: 'Storm Lightning',
      type: 'effect',
      target: 'chain',
      stats: { bounces: [2,4,6,8] },
    },],
  },
  {
    name: 'High Voltage',
    title: 'ZeusBoltAoETrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_10_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    prereqs: { Zeus: ['Thunder Dash', 'Thunder Flourish', "Zeus' Aid"] },
    description: (stats) =>
      `<div>Your lightning bolt effects deal damage in a larger area.</div>` +
      `<div>▶ Bolt Area of Effect:<div><span>+${ fp(stats.multiply_radius) }%</span></div></div>`,
    mods: [{
      name: 'High Voltage',
      type: 'effect',
      target: 'bolt',
      stats: { multiply_radius: [0.6,0.72,0.84,0.96] },
      pom: pom_4,
    },],
  },
  {
    name: 'Static Discharge',
    title: 'ZeusLightningDebuff',
    type: 'secondary',
    icon: 'assets/traits/Zeus_12_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    prereqs: { 'Zeus': [ 'Thunder Flourish', "Zeus' Aid", 'Thunder Dash', "Heaven's Vengeance", 'Lightning Strike', 'Electric Shot', 'Lightning Reflexes' ] },
    description: (stats) =>
      `<div>Your Lightning effects also make foes<b>Jolted.</b></div>` +
      `<div>▶ Jolt Damage:<div><span>${ fv(stats.min, stats.max) }</span></div></div>`,
    effects: [
      { name: 'Jolted', type: 'jolted', trigger: 'chain', stats: { duration: 10 } },
      { name: 'Jolted', type: 'jolted', trigger: 'bolt', stats: { duration: 10 } },
      {
        name: 'Jolt',
        type: 'jolt',
        trigger: 'jolted',
        stats: {
          min: [60, 78, 108, 138],
          max: [60, 90, 120, 150],
        },
        pom: pom_6,
      },
    ],
  },
  {
    name: 'Clouded Judgment',
    title: 'SuperGenerationTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_09_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    prereqs: { Call: ["Aphrodite's Aid", "Ares' Aid", "Artemis' Aid", "Athena's Aid", "Demeter's Aid", "Dionysus' Aid", "Poseidon's Aid", "Zeus' Aid"] },
    description: (stats) =>
      `<div>Your<b>God Gauge</b>charges faster when you deal or take damage.</div>` +
      `<div>▶ Wrath Gain:<div><span>+${ fp(stats.gauge_charge) }%</span></div></div>`,
    feature: (stats) =>
      `Your<b class="Zeus">God Gauge</b>charges <span>${ fp(stats.gauge_charge) }%</span> faster when you deal or take damage.`,
    mods: [{
      name: 'Clouded Judgment',
      type: 'effect',
      target: 'coefficients',
      stats: { gauge_charge: [0.1,0.12,0.14,0.16] },
      pom: pom_4,
    }],
  },
  {
    name: 'Billowing Strength',
    title: 'OnWrathDamageBuffTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_13_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    prereqs: { Call: ["Aphrodite's Aid", "Ares' Aid", "Artemis' Aid", "Athena's Aid", "Demeter's Aid", "Dionysus' Aid", "Poseidon's Aid", "Zeus' Aid"] },
    description: (stats) =>
      `<div>After using<b>Call</b>you deal more damage for<b>15 Sec.</b></div>` +
      `<div>▶ Bonus Damage:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    mods: [{
      name: 'Billowing Strength',
      type: 'effect',
      target: 'coefficients',
      stats: { mult_base: [0.2, 0.22, 0.24, 0.26] },
      status: { target: 'player', name: 'Billowing Strength' },
      pom: pom_4,
    }],
  },
  {
    name: 'Double Strike',
    title: 'ZeusBonusBoltTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_11_Large.png',
    god: 'Zeus',
    rarity: 0,
    prereqs: { Zeus: ['Thunder Dash', 'Thunder Flourish', "Zeus' Aid"] },
    description: (stats) =>
      `<div>Your lightning bolt effects have a chance to strike twice.</div>` +
      `<div>▶ Strike Chance:<div><span>${ fv(stats.chance) }</span></div></div>`,
    effects: [
      {
        name: 'Double Strike',
        type: 'doublestrike',
        trigger: 'bolt',
        stats: { chance: [0.25, 0.3, 0.35, 0.4] },
        pom: pom_4,
      },
    ],
    mods: [
      {
        name: 'Double Strike',
        type: 'effect',
        target: 'bolt',
        stats: { count: 1 },
        status: { target: 'foe', name: 'Double Strike', max_stacks: 2 },
      }
    ],
  },
  {
    name: 'Splitting Bolt',
    title: 'ZeusChargedBoltTrait',
    type: 'secondary',
    icon: 'assets/traits/Zeus_02_Large.png',
    god: 'Zeus',
    rarity: 4,
    prereqs: { Zeus: ['Double Strike', 'High Voltage', 'Storm Lightning'] },
    description: (stats) =>
      `<div>All your lightning effects create an additional burst.</div>` +
      `<div>▶ Lightning Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [
      {
        name: 'Splitting Bolt',
        type: 'spark',
        trigger: 'bolt',
        stats: { min: 40 },
      },
      {
        name: 'Splitting Bolt',
        type: 'spark',
        trigger: 'chain',
        stats: { min: 40 },
      },
    ],
  },
]