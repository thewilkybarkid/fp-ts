import { booleanAlgebraBoolean, getDualBooleanAlgebra, getFunctionBooleanAlgebra } from '../src/BooleanAlgebra'
import { pipe } from '../src/function'
import { deepStrictEqual } from './util'

describe('BooleanAlgebra', () => {
  it('booleanAlgebraBoolean', () => {
    const BA = booleanAlgebraBoolean
    deepStrictEqual(pipe(true, BA.implies(true)), true)
    deepStrictEqual(pipe(true, BA.implies(false)), false)
    deepStrictEqual(pipe(false, BA.implies(true)), true)
    deepStrictEqual(pipe(false, BA.implies(false)), true)

    deepStrictEqual(pipe(true, BA.join(true)), true)
    deepStrictEqual(pipe(true, BA.join(false)), true)
    deepStrictEqual(pipe(false, BA.join(true)), true)
    deepStrictEqual(pipe(false, BA.join(false)), false)

    deepStrictEqual(pipe(true, BA.meet(true)), true)
    deepStrictEqual(pipe(true, BA.meet(false)), false)

    deepStrictEqual(BA.not(true), false)
    deepStrictEqual(BA.not(false), true)

    deepStrictEqual(BA.one, true)
    deepStrictEqual(BA.zero, false)
  })

  it('getFunctionBooleanAlgebra', () => {
    const BA = getFunctionBooleanAlgebra(booleanAlgebraBoolean)<number>()
    const f = (n: number) => n >= 0
    const g = (n: number) => n < 2
    deepStrictEqual(pipe(f, BA.implies(g))(1), true)
    deepStrictEqual(pipe(f, BA.implies(g))(-1), true)

    deepStrictEqual(pipe(f, BA.join(g))(1), true)
    deepStrictEqual(pipe(f, BA.join(g))(-1), true)

    deepStrictEqual(pipe(f, BA.meet(g))(1), true)
    deepStrictEqual(pipe(f, BA.meet(g))(-1), false)

    deepStrictEqual(BA.not(f)(1), false)
    deepStrictEqual(BA.not(f)(-1), true)

    deepStrictEqual(BA.one(1), true)
    deepStrictEqual(BA.one(-1), true)
    deepStrictEqual(BA.zero(1), false)
    deepStrictEqual(BA.zero(-1), false)
  })

  it('getDualBooleanAlgebra', () => {
    const BA = getDualBooleanAlgebra(booleanAlgebraBoolean)
    deepStrictEqual(pipe(true, BA.implies(true)), true)
    deepStrictEqual(pipe(true, BA.implies(false)), false)
    deepStrictEqual(pipe(false, BA.implies(true)), true)
    deepStrictEqual(pipe(false, BA.implies(false)), true)

    deepStrictEqual(pipe(true, BA.join(true)), true)
    deepStrictEqual(pipe(true, BA.join(false)), false)
    deepStrictEqual(pipe(false, BA.join(true)), false)
    deepStrictEqual(pipe(false, BA.join(false)), false)

    deepStrictEqual(pipe(true, BA.meet(true)), true)
    deepStrictEqual(pipe(true, BA.meet(false)), true)

    deepStrictEqual(BA.not(true), false)
    deepStrictEqual(BA.not(false), true)

    deepStrictEqual(BA.one, false)
    deepStrictEqual(BA.zero, true)
  })
})
