import { fv, fp, pom, pom_1_01, pom_1_04, pom_1_1, pom_2_1, pom_3_1  } from './util'

export default [
  {
    name: 'Artemis',
    type: 'god',
    icon: 'assets/gods/Artemis.png',
  },
  {
    name: 'Deadly Flourish',
    description: (stats) =>
      '<div>Your<b>Special</b>has a<span>20%</span>chance to do <b>critical</b> damage.</div>' +
      `<div>▶ Special Damage:<div><span>+${fp(stats.min, stats.max)}%<span></div></div>`,
    type: 'special',
    icon: 'assets/traits/Artemis_02_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    mods: [
      {
        name: 'Deadly Flourish',
        type: 'stat',
        target: 'special',
        stats: {
          mult_min: [ 0.4, 0.52, 0.72, 0.92 ],
          mult_max: [ 0.4, 0.6, 0.8, 1.0 ],
          crit: [ 0.2, 0.2, 0.2, 0.2 ],
        },
      }
    ],
  },
  {
    name: 'Pressure Points',
    type: 'secondary',
    icon: 'assets/traits/Artemis_08_Large.png',
    god: 'Artemis',
    rarity: 0,
    level: 1,
    description: (stats) => `Crit: +${ 100*stats.crit }%`,
    mods: [
      { name: 'Pressue Points', type: 'stat', target: 'coefficients', stats: { crit: [ 0.02, 0.03, 0.04, 0.05 ] }, pom: (n) => n / 100, }
    ],
  },
]