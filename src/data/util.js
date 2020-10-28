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

const m1 = 0.4
const m2 = 0.6
const m3 = 0.8

export function pom(m, t) {
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

export const pom_1_1 = pom(m1, 1)
export const pom_1_01 = pom(m1, 0.01)
export const pom_1_04 = pom(m1, 0.04)
export const pom_2_1 = pom(m2, 1)
export const pom_2_01 = pom(m2, 0.01)
export const pom_2_04 = pom(m2, 0.04)
export const pom_3_1 = pom(m3, 1)
export const pom_3_01 = pom(m3, 0.01)
export const pom_3_04 = pom(m3, 0.04)

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