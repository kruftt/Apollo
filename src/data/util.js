export const beowolf_traits = ['Passion Flare', 'Phalanx Flare', 'Slicing Flare', "Hunter's Flare", 'Icy Flare', 'Trippy Flare', 'Flood Flare', 'Thunder Flare' ]
export const beowolf_exclusions = ['Crush Shot', 'Phalanx Shot', 'Slicing Shot', 'True Shot', 'Crystal Beam', 'Trippy Shot', 'Flood Shot', 'Electric Shot']

export function fv(a, b, d = 0) {
  const p = Math.pow(10, d)
  a = Math.floor(p*a)/p
  b && (b = Math.floor(p*b)/p)
  return (a === b || !b) ? `${a}` : `${a}-${b}`
}
export function fp(a, b, d = 0) {
  const p = Math.pow(10, d)
  a = Math.floor(100*p*a)/p
  b && (b = Math.floor(100*p*b)/p)
  return (a === b || !b) ? `${a}` : `${a}-${b}`
}

export function pom(id_mult, min_mult = 0.1, dim_mult = 0.7) {
  // m = identical multiplier
  return (l, b) => {
    // l = level, b = base common mult/damage
    let t = b * min_mult
    let result = 0
    let accumulator = id_mult * b * 1.4285714285714286
    let value
    for (let i = 1; i < l; i++) {
      accumulator *= dim_mult
      value = Math.max(t, accumulator)
      // value = (value < 1) ? Math.round(100*value)/100 : Math.floor(value)
      result += value
    }
    // return result
    return (b < 1) ? Math.round(100*result)/100 : Math.round(result)
  }
}

export const pom_2 = pom(0.2)
export const pom_3 = pom(0.3)
export const pom_4 = pom(0.4)
export const pom_6 = pom(0.6)
export const pom_8 = pom(0.8)