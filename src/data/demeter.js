import { fv, fp, pom, pom_4, pom_8 } from './util'

export const chill = {
  name: 'Chill',
  type: 'chill',
  stats: { speed: -0.04, },
  status: { name: 'Chill', target: 'foe' },
}

export default [
  {
    name: 'Demeter',
    type: 'god',
    icon: 'assets/gods/Demeter.png',
  },
  {
    name: 'Frost Strike',
    type: 'attack',
    icon: 'assets/traits/Demeter_01_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Attack</b>is stronger and inflicts<b>Chill.</b></div>' +
      `<div>▶ Attack Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    mods: [{
      name: 'Frost Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_min: [0.4, 0.52, 0.72, 0.92], mult_max: [0.4, 0.6, 0.8, 1.0] },
      pom: pom_4,
    }],
    effects: [{ ...chill, trigger: 'attack' }],
  },
  {
    name: 'Frost Flourish',
    type: 'special',
  icon: 'assets/traits/Demeter_secondary_attack.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Special</b>is stronger and inflicts<b>Chill.</b></div>' +
      `<div>▶ Special Damage:<div><span>+${ fp(stats.mult_min, stats.mult_max) }%</span></div></div>`,
    mods: [{
      name: 'Frost Flourish',
      type: 'effect',
      target: 'special',
      stats: { mult_min: [0.6, 0.78, 1.08, 1.38], mult_max: [0.6, 0.9, 1.2, 1.5] },
      pom: pom_4,
    }],
    effects: [{ ...chill, trigger: 'special' }],
  },
  {
    name: 'Crystal Beam',
    type: 'cast',
    icon: 'assets/traits/Demeter_02_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    threshold: 2,
    exclude: [ 'Aegis - Aspect of Beowolf' ],
    description: (stats) =>
      '<div>Your<b>Cast</b>drops a crystal that fires a beam straight ahead for<b>5 Sec.</b></div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min, null, 1) }</span></div></div>`,
    abilities: [{
      name: 'Crystal Beam',
      type: 'beam',
      trigger: 'cast',
      stats: { min: [8, 9.2, 10.4, 11.6], duration: 5, interval: 0.2 },
      status: { target: 'foe', name: 'Crystal Beam' },
      pom: pom(0.2, 0.1)
    }],
    mods: [{
      name: 'Crystal Beam Stacks',
      type: 'effect',
      target: 'Crystal Beam',
      stats: { count: 1 },
      status: { target: 'foe', name: 'Crystal Beam' },
    }]
  },
  {
    name: 'Icy Flare',
    type: 'cast',
    icon: 'assets/traits/Demeter_02_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    threshold: 2,
    description: (stats) =>
      '<div>Your<b>Cast</b>damages foes around you and inflicts<b>Chill.</b></div>' +
      `<div>▶ Cast Damage:<div><span>${ fv(stats.min, null, 1) }</span></div></div>`,
    abilities: [{
      name: 'Icy Flare',
      type: 'flare',
      trigger: 'cast',
      stats: { min: [70, 80, 90, 100] },
      pom: pom(0.2, 0.1)
    }],
  },
  {
    name: 'Mistral Dash',
    type: 'dash',
    icon: 'assets/traits/Demeter_03_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Dash</b>shoots a gust ahead that inflicts<b>Chill.</b></div>' +
      `<div>▶ Gust Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [{
      name: 'Mistral Dash',
      type: 'gust',
      trigger: 'dash',
      stats: { min: [15, 22.5, 30, 37.5] },
      pom: pom(0.6, 0.2),
    }],
    effects: [{...chill, trigger: 'gust'}],
  },
  {
    name: "Demeter's Aid",
    type: 'call',
    icon: 'assets/traits/Demeter_04_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    description: (stats) =>
      '<div>Your<b>Call</b>creates a winter vortex for<span>5 Sec.,</span> deals damage every<span>0.25 Sec</span>inflicting<b>Chill.</b></div>' +
      `<div>▶ Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    abilities: [
      {
        name: "Demeter's Aid",
        type: 'vortex',
        trigger: 'call',
        stats: { min: [10, 11, 12, 13], duration: 5, interval: 0.25 },
        status: { name: 'Winter Vortex', target: 'foe' },
        pom: pom(0.4, 0.2)
      },
      {
        name: "Demeter's Aid - Max",
        type: 'vortex',
        trigger: 'call',
        stats: { min: [10, 11, 12, 13], duration: 15, interval: 0.25 },
        status: { name: 'Winter Vortex', target: 'foe' },
        pom: pom(0.4, 0.2)
      },
    ],
    mods: [{
      name: 'Vortex Stacks',
      type: 'effect',
      target: 'vortex',
      stats: { count: 1 },
      status: { name: 'Winter Vortex', target: 'foe' },
    },],
    effects: [{...chill, trigger: 'vortex'}],
  },
  {
    name: 'Frozen Touch',
    type: 'secondary',
    icon: 'assets/traits/Demeter_13_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    threshold: 2,
    description: (stats) =>
      '<div>After you take damage, damage and completely<b>Chill</b>your foe.</div>' +
      `<div>▶ Revenge Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [
      {
        name: 'Frozen Touch',
        type: 'frozen',
        trigger: 'revenge',
        stats: { min: [10,15,20,25] },
        pom: pom_8,
      },
      { ...chill, trigger: 'frozen', stats: { speed: -0.4, count: 10 }, status: { ...chill.status, stacks: false }},
    ],
  },
  {
    name: 'Rare Crop',
    type: 'secondary',
    icon: 'assets/traits/Demeter_08_Large.png',
    god: 'Demeter',
    rarity: 0,
    description: (stats) =>
      '<div>Your<b>Boons</b>become<b>Common,</b>then gain<b>Rarity</b>every<b>3 Encounters.</b></div>' +
      `<div>▶ Random boons affected:<div><span>${ fv(stats.num_boons) }</span></div></div>`,
    feature: (stats) =>
      `<div><span>${ (stats.num_boons === 1) ? `${stats.num_boons}</span> <b>Boon</b> becomes <b>Common,</b> then gains` : `${stats.num_boons}</span> <b>Boons</b> become <b>Common,</b> then gain` } <span class="rare">Rarity</span> every <b>3</b> Encounters.</div>`,
    effects: [{
      name: 'Rare Crop',
      type: 'boon buff',
      trigger: 'none',
      stats: { num_boons: [1, 2, 3, 3] },
    },],
  },
  {
    name: 'Ravenous Will',
    type: 'secondary',
    icon: 'assets/traits/Demeter_11_Large.png',
    god: 'Demeter',
    rarity: 0,
    description: (stats) =>
      `<div>While you have no<b>Bloodstone</b>take<b>10%</b>less damage and deal more.</div>` +
      `<div>▶ Damage Bonus:<div><span>+${ fp(stats.mult_base) }%</span></div></div>`,
    effects: [],
    mods: [{
      name: 'Ravenous Will',
      type: 'effect',
      target: 'coefficients',
      stats: { reduction: 0.1, mult_base: [0.1,0.2,0.3,0.4] },
      status: { target: 'player', name: 'Ravenous Will' },
      pom: pom_4,
    }],
  },
  {
    name: 'Nourished Soul',
    type: 'secondary',
    icon: 'assets/traits/Demeter_09_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    threshold: 2,
    description: (stats) =>
      '<div>Any&nbsp;<img src="/Apollo/assets/LifeRestore_Small.png" />&nbsp;effects are more potent. Restore<span>+30%</span>now.</div>' +
      `<div>▶ Improved Restoration:<div><span>+${ fp(stats.restoration) }%</span></div></div>`,
    feature: (stats) =>
      `<img src="/Apollo/assets/LifeRestore_Small.png" />&nbsp;effects are <span>${ fp(stats.restoration) }%</span> more potent.`,
    mods: [{
      name: 'Nourished Soul',
      type: 'effect',
      target: 'coefficients',
      stats: { restoration: [0.3, 0.325, 0.345, 0.3675] },
      pom: pom_4,
    }],
  },
  {
    name: 'Snow Burst',
    type: 'secondary',
    icon: 'assets/traits/Demeter_05_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    threshold: 2,
    description: (stats) =>
      '<div>Whenever you<b>Cast,</b>damage nearby foes and inflict<b>Chill.</b></div>' +
      `<div>▶ Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [
      {
        name: 'Snow Burst',
        type: 'snow',
        trigger: 'cast',
        stats: { min: [40,50,60,70] },
        pom: pom_4,
      },
      { ...chill, trigger: 'snow' },
    ],
  },
  {
    name: 'Arctic Blast',
    type: 'secondary',
    icon: 'assets/traits/Demeter_07_Large.png',
    god: 'Demeter',
    rarity: 0,
    prereqs: { Demeter: ["Demeter's Aid", "Frost Flourish", "Frost Strike", "Mistral Dash", "Snow Burst"] },
    description: (stats) =>
      '<div>Applying 10 stacks of <b>Chill</b>causes a blast, clearing the effect.</div>' +
      `<div>▶ Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    effects: [{
      name: 'Arctic Blast',
      type: 'arctic',
      trigger: 'chill',
      stats: { min: [100, 120, 140, 160] },
      pom: pom_4,
    }],
  },
  {
    name: 'Killing Freeze',
    type: 'secondary',
    icon: 'assets/traits/Demeter_12_Large.png',
    god: 'Demeter',
    rarity: 0,
    prereqs: { Demeter: ["Demeter's Aid", "Frost Flourish", "Frost Strike", "Mistral Dash", "Snow Burst"] },
    description: (stats) =>
      '<div>Applying<b>Chill</b>to all enemies causes them to<b>Slow</b>and<b>Decay.</b></div>' +
      `<div>▶ Slow:<span>${fp(stats.speed)}%,</span>▶ Decay Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    mods: [
      {
        name: 'Killing Freeze',
        type: 'effect',
        target: 'foe',
        stats: { speed: [-.1, -.15, -.2, -.25] },
        status: { target: 'foe', name: 'Killing Freeze' },
      },
    ],
    effects: [{
      name: 'Killing Freeze',
      type: 'freeze',
      trigger: 'chill',
      stats: { min: [20, 30, 40, 50], duration: .5 },
    }],
  },
  {
    name: 'Glacial Glare',
    type: 'secondary',
    icon: 'assets/traits/Demeter_14_Large.png',
    god: 'Demeter',
    rarity: 0,
    level: 1,
    prereqs: { Demeter: ['Crystal Beam'] },
    description: (stats) =>
      '<div>Your<b>Cast</b>fires longer and inflicts<b>Chill.</b></div>' +
      `<div>▶ Bonus Duration:<div><span>${ fv(stats.duration, null, 1) } Sec.</span></div></div>`,
    mods: [{
      name: 'Glacial Glare',
      type: 'effect',
      target: 'cast',
      stats: { duration: [2,2.4,2.8,3.2] },
      pom: pom(0.5, 0.5)
    }],
    effects: [{...chill, trigger: 'cast'}]
  },
  {
    name: 'Winter Harvest',
    type: 'secondary',
    icon: 'assets/traits/Demeter_10_Large.png',
    god: 'Demeter',
    rarity: 4,
    level: 1,
    prereqs: { Demeter: ['Arctic Blast', 'Ravenous Will', 'Killing Freeze'] },
    threshold: 2,
    description: (stats) =>
      '<div>Chill-affected foes shatter at 10% hp, inflicting<b>Chill</b>nearby.</div>' +
      `<div>▶ Shatter Area Damage:<div><span>${ fv(stats.min) }</span></div></div>`,
    feature: (stats) =>
      `<span class="Demeter">Chill-affected</span> foes <span class="Demeter">shatter</span> at <span>10%</span> hp, inflicting <span class="Demeter">Chill</span> nearby.`,
    effects: [{
      name: 'Shatter',
      type: 'shatter',
      trigger: 'chill',
      stats: { min: [50, null, null, null, 50] },
      pom: pom_4,
    },],
  },
]