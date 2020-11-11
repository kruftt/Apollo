import { fp, fv } from './util'

export default [
  {
    name: 'Hermes',
    type: 'god',
    icon: 'assets/gods/Hermes.png',
  },
  {
    name: 'Swift Strike',
    type: 'secondary',
    icon: 'assets/traits/Hermes_06.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Attack</b>is<span>+${ fp(stats.mult_speed) }%</span> faster.</div>` +
      `<div>▶ Attack Speed:<div><span>+${ fp(stats.mult_speed) }%</span></div></div>`,
    mods: [{
      name: 'Swift Strike',
      type: 'effect',
      target: 'attack',
      stats: { mult_speed: [0.125, 0.2125, 0.3, 0.3875] }
    }],
  },
  {
    name: 'Swift Flourish',
    type: 'secondary',
    icon: 'assets/traits/Hermes_09.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Special</b>is<span>+${ fp(stats.mult_speed) }%</span> faster.</div>` +
      `<div>▶ Special Speed:<div><span>+${ fp(stats.mult_speed) }%</span></div></div>`,
    mods: [{
      name: 'Swift Strike',
      type: 'effect',
      target: 'special',
      stats: { mult_speed: [0.125, 0.2125, 0.3, 0.3875] }
    }],
  },
  {
    name: 'Flurry Cast',
    type: 'secondary',
    icon: 'assets/traits/Hermes_02.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>Your<b>Cast</b>is<span>+${ fp(stats.mult_speed) }%</span> faster and fully automatic.</div>` +
      `<div>▶ Cast Speed:<div><span>+${ fp(stats.mult_speed) }%</span></div></div>`,
    mods: [{
      name: 'Flurry Cast',
      type: 'effect',
      target: 'cast',
      stats: { mult_speed: [0.2, 0.4, 0.6, 0.8] }
    }],
  },
  {
    name: 'Hyper Sprint',
    type: 'secondary',
    icon: 'assets/traits/Hermes_08.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>For<span>${ fv(stats.duration) } Sec.</span>after you<b>Dash</b>become<b>Sturdy</b>and run<span>+100%</span>faster.</div>` +
      `<div>▶ Duration:<div><span>${ fv(stats.duration) } Sec.</span></div></div>`,
    effects: [{
      name: 'Hyper Sprint',
      type: 'sturdy',
      trigger: 'dash',
      status: { target: 'player', name: 'sturdy' },
    }],
    mods: [{
      name: 'Hyper Sprint',
      type: 'effect',
      target: 'coefficients',
      stats: { speed: 1 },
      status: { target: 'player', name: 'Hyper Sprint' },
    }]
  },
  {
    name: 'Greater Haste',
    type: 'secondary',
    icon: 'assets/traits/Hermes_05.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>You move<span>+${ fp(stats.speed) }%</span>faster.</div>` +
      `<div>▶ Movement Speed:<div><span>+${ fp(stats.speed) }%</span></div></div>`,
    mods: [{
      name: 'Greater Haste',
      type: 'effect',
      target: 'coefficients',
      stats: { speed: [0.2, 0.3, 0.4, 0.5] },
    }],
  },
  {
    name: 'Quick Recovery',
    type: 'secondary',
    icon: 'assets/traits/Hermes_07.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>After you take damage, quickly<b>Dash</b>to recover up to<span>+${ fp(stats.recovery) }%</span>Health lost.</div>` +
      `<div>▶ Recovery:<div><span>+${ fp(stats.recovery) }%</span></div></div>`,
    effects: [{
      name: 'Quick Recovery',
      type: 'recovery',
      target: 'dash',
      stats: { recovery: [0.2, 0.3, 0.4, 0.5] },
    }],
  },
  {
    name: 'Greater Evasion',
    type: 'secondary',
    icon: 'assets/traits/Hermes_04.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>You have<span>+${ fp(stats.dodge) }%</span>change to <b>Dodge.</b></div>` +
      `<div>▶ Dodge Chance:<div><span>+${ fp(stats.dodge) }%</span></div></div>`,
    mods: [{
      name: 'Greater Evasion',
      type: 'effect',
      target: 'player',
      stats: { dodge: [0.1, 0.15, 0.2, 0.25] },
    }],
  },
  {
    name: 'Greatest Reflex',
    type: 'secondary',
    icon: 'assets/traits/Hermes_01.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>You can<b>Dash</b><span>+${ fv(stats.dashes) }</span>times in a row.</div>` +
      `<div>▶ Extra Dashes:<div><span>+${ fv(stats.dashes) }</span></div></div>`,
    mods: [{
      name: 'Greatest Reflex',
      type: 'effect',
      target: 'player',
      stats: { dashes: [1,2,3,4] },
    }],
  },
  {
    name: 'Second Wind',
    type: 'secondary',
    icon: 'assets/traits/Hermes_12.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>After using<b>Call,</b>gain<b>Dodge</b>chance and move speed for<span>6 Sec.</span></div>` +
      `<div>▶ Bonus Dodge Chance & Move Speed:<div><span>+${ fp(stats.dodge) }</span></div></div>`,
    mods: [{
      name: 'Second Wind',
      type: 'effect',
      target: 'coefficients',
      stats: { dodge: [0.3, 0.375, 0.45, 0.525], speed: [0.3, 0.375, 0.45, 0.525] },
      status: { target: 'player', name: 'Second Wind' },
    }],
    effects: [{
      name: 'Second Wind',
      type: 'second wind',
      trigger: 'call',
    }]
  },
  {
    name: 'Quick Reload',
    type: 'secondary',
    icon: 'assets/traits/Hermes_03.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>Foes drop Cast Ammo stuck in them faster.</div>` +
      `<div>▶ Drop Time:<div><span>${ fv(15/stats.div_duration) }</span></div></div>`,
    mods: [{
      name: 'Quick Reload',
      type: 'effect',
      target: 'dislodge',
      stats: { div_duration: [3.2, 4.8, 5.4, 7] },
    }],
  },
  {
    name: 'Side Hustle',
    type: 'secondary',
    icon: 'assets/traits/Hermes_14.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>Each time you enter a<b>Chamber,</b>gain a bit wealth.</div>` +
      `<div>▶ Obols per Chamber:<div><span>${'insert value'}</span></div></div>`,
  },
  {
    name: 'Rush Delivery',
    type: 'secondary',
    icon: 'assets/traits/Hermes_15.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>You deal bonus damage based on any bonus move speed.</div>` +
      `<div>▶ Bonus Damage from Bonus Speed:<div><span>+${ fp(stats.damage_from_speed) }%</span></div></div>`,
    mods: [{
      name: 'Rush Delivery',
      type: 'effect',
      target: 'coefficients',
      stats: { damage_from_speed: [0.5, 0.75, 1, 1.25] }
    }],
  },
  {
    name: 'Auto Reload',
    type: 'secondary',
    icon: 'assets/traits/Hermes_03.png',
    god: 'Hermes',
    rarity: 0,
    description: (stats) =>
      `<div>You regenerate Cast Ammo faster.</div>` +
      `<div>▶ Regeneration Time:<div><span>${ fv(2.5 - stats.ammo_regen) }</span></div></div>`,
    mods: [{
      name: 'Auto Reload',
      type: 'effect',
      target: 'coefficients',
      stats: { ammo_regen: [-0.5, -1, -1.5, -2] },
    }],
  },
  {
    name: 'Greater Recall',
    type: 'secondary',
    icon: 'assets/traits/Hermes_11.png',
    god: 'Hermes',
    rarity: 4,
    description: (stats) =>
      `<div>Your Cast Ammo automatically return to you.</div>`,
  },
  {
    name: 'Bad News',
    type: 'secondary',
    icon: 'assets/traits/Hermes_02.png',
    god: 'Hermes',
    rarity: 4,
    description: (stats) =>
      `<div>Your cast deals more damage to foes without Cast Ammo on them.</div>` +
      `<div>▶ First shot damage:<div><span>+${ fp(stats.first) }%</span></div></div>`,
    mods: [{
      name: 'Bad News',
      type: 'effect',
      target: 'cast',
      stats: { first: 0.5 }
    }],
  },
]