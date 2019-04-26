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

type Option<A> = None<A> | Some<A>

const none: Option<never> = new None()
const some = <A>(a: A): Option<A> => new Some(a)

const double = (x: number): number => x * 2

const inverse = (x: number): Option<number> =>
  x === 0 ? none : some(1 / x)

const doubleInverse = (x: number): Option<number> => inverse(x).map(double)

console.log(
doubleInverse(2)  // Some(1)
)

console.log(
doubleInverse(0) // None
)

const inc = (x: number): number => x + 1

console.log(
inverse(0)
  .map(double)
  .map(inc) // None
)

console.log(
inverse(4)
  .map(double)
  .map(inc) // Some(1.5)
)
