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

// const m1 = 0.1
// const m2 = 0.2
// const m4 = 0.4
// const m6 = 0.6
// const m8 = 0.8

// export function pom(m, t) {
//   return (l, b) => {
//     let result = 0
//     let value = m * b * 1.4285714285714286
//     for (let i = 1; i < l; i++) {
//       value *= 0.7
//       result += Math.max(t, value)
//     }
//     return result
//   }
// }

// local totalMultiplier = (1 + m) * d_mult^n
// if totalMultiplier < minMultiplier then
//   totalMultiplier = minMultiplier

export function pom(id_mult, min_mult = 0.1, dim_mult = 0.7) {
  // m = identical multiplier
  return (l, b) => {
    // l = level, b = base common bonus
    let t = b * min_mult
    let result = 0
    let accumulator = id_mult * b * 1.4285714285714286
    let value
    for (let i = 1; i < l; i++) {
      accumulator *= dim_mult
      value = Math.max(t, accumulator)
      value = (value < 1) ? Math.round(100*value)/100 : Math.floor(value)
      result += value
    }
    return result
  }
}

export const pom_2 = pom(0.2)
export const pom_3 = pom(0.3)
export const pom_4 = pom(0.4)
export const pom_6 = pom(0.6)
export const pom_8 = pom(0.8)

// export const pom_1_1 = pom(m1, 1)
// export const pom_3_01 = pom(0.3, 0.01)
// export const pom_4_1 = pom(m4, 1)
// export const pom_4_2 = pom(m4, 2)
// export const pom_4_01 = pom(m4, 0.01)
// export const pom_4_04 = pom(m4, 0.04)
// export const pom_6_1 = pom(m6, 1)
// export const pom_6_2 = pom(m6, 2)
// export const pom_6_01 = pom(m6, 0.01)
// export const pom_6_04 = pom(m6, 0.04)
// export const pom_8_1 = pom(m8, 1)
// export const pom_8_01 = pom(m8, 0.01)
// export const pom_8_04 = pom(m8, 0.04)

/*
const c = 10/3
const c1 = c*m1
const c2 = c*m2
const c3 = c*m3

function pom1(l, b) {
  return c1*b*(1 - Math.pow(0.7, l-1))
}
function pom2(l, b) {
  return c2*b*(1 - Math.pow(0.7, l-1))
}
function pom3(l, b) {
  return c3*b*(1 - Math.pow(0.7, l-1))
}
function getPom(m) {
  const cm = c * m
  return (l, b) => cm*b*(1 - Math.pow(0.7, l-1))
}

function __pom(m) {
  return (t) => {
    return (l, b) => {
      let result = 0
      let value = m * b * 1.4285714285714286
      for (let i = 1; i < l; i++) {
        value *= 0.7
        result += Math.max(t, value)
      }
      return result
    }
  }
}
*/