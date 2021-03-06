export const beowolf_traits = ['Passion Flare', 'Phalanx Flare', 'Slicing Flare', "Hunter's Flare", 'Icy Flare', 'Trippy Flare', 'Flood Flare', 'Thunder Flare' ]
export const beowolf_exclusions = ['Crush Shot', 'Phalanx Shot', 'Slicing Shot', 'True Shot', 'Crystal Beam', 'Trippy Shot', 'Flood Shot', 'Electric Shot']
export const beowolf_cast_exclusions = ['Aegis - Aspect of Zagreus', 'Aegis - Aspect of Chaos', 'Aegis - Aspect of Zeus', 'Coronacht', 'Exagryph', 'Malphon', 'Stygius', 'Varatha' ]

export function fv(a, b, d = 0) {
  const p = Math.pow(10, d)
  a = Math.round(p*a)/p
  b && (b = Math.round(p*b)/p)
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
    let tot_dim_mult = b * id_mult

    let value, result = 0
    for (let i = 1; i < l; i++) {
      value = Math.max(t, tot_dim_mult)
      result += value
      tot_dim_mult *= dim_mult
    }

    return (b < 1) ? Math.round(100*result)/100 : Math.round(10*result)/10
  }
}

export const pom_2 = pom(0.2)
export const pom_3 = pom(0.3)
export const pom_4 = pom(0.4)
export const pom_6 = pom(0.6)
export const pom_8 = pom(0.8)