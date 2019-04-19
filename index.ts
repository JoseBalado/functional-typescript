// import { some, option } from 'fp-ts/lib/Option'
// import { liftA2, sequenceT } from 'fp-ts/lib/Apply'

const xs = [1, 2, 3]
const double = (x: number): number => x * 2

const ys = []
for (var i = 0; i < xs.length; i++) {
  ys.push(double(xs[i]))
}

const zs = xs.map(double)

console.log(zs)

const f: { [key: number]: number } = {
  1: 2,
  2: 4,
  3: 6
  }


console.log(f)

type Option<A> = None<A> | Some<A>
class None<A> {
  readonly _tag = 'None'
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
}
class Some<A> {
  readonly _tag = 'Some'
  constructor(readonly value: A) { }
  map<B>(f: (a: A) => B): Option<B> {
    return some(f(this.value))
  }
}

const none: Option<never> = new None()
const some = <A>(a: A): Option<A> => new Some(a)

const inverse = (x: number): Option<number> =>
  x === 0 ? none : some(1 / x)

const doubleInverse = (x: number): Option<number> => inverse(x).map(double)
console.log(doubleInverse(2)) // Some(1)
console.log(doubleInverse(0)) // None
