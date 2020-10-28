import { fv, fp, pom, pom_1_01, pom_1_04, pom_1_1, pom_2_1, pom_3_1  } from './util'

export default [
  {
    name: 'Zeus',
    type: 'god',
    icon: 'assets/gods/Zeus.png',
  },

  {
    name: 'Lightning Strike',
    description: (stats) =>
      '<div>Your<b>Attack</b>emits chain-lightning when you damage a foe.</div>' +
      `<div>Lightning Damage:<div><span>${stats.max}</span></div></div>`,
    type: 'attack',
    god: 'Zeus',
    icon: 'assets/traits/Zeus_03_Large.png',
    rarity: 0,
    level: 1,
    effects: [
      {
        name: 'Chain Lightning',
        type: 'lightning',
        trigger: 'attack',
        stats: { chain: true, min: [10, 12.5, 15, 20], max: [10, 12.5, 15, 20]},
        pom: (n) => 2*n,
      },
    ],
  },
  {
    name: 'Static Discharge',
    type: 'secondary',
    icon: 'assets/traits/Zeus_12_Large.png',
    god: 'Zeus',
    rarity: 0,
    level: 1,
    prereqs: { 'Zeus': [ 'Lightning Strike' ], 'Artemis': ['Pressure Points'] },
    // prereqs: { 'Zeus': [ 'Lightning Strike', 'Pressure Points'] },
    // threshold: 2,
    description: (stats) => `<div>Jolted: ${ stats.max }`,
    effects: [
      { name: 'Jolted', type: 'jolted', trigger: 'lightning', stats: { duration: [10, 10, 10, 10] } },
      {
        name: 'Jolt',
        type: 'jolt',
        trigger: 'jolted',
        stats: {
          min: [60, 78, 108, 138],
          max: [60, 90, 120, 150],
        },
        pom: (level) => {
          const values = [ 20, 30, 35, 39 ]
          return (level > values.length)
            ? 39 + (3 * (level - values.length))
            : values[level - 1]
        }
      },
    ],
  },
]