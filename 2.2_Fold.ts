class None<A> {
  readonly _tag = 'None'
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  fold<R>(f: () => R, g: (a: A) => R): R {
    return f()
  }
}
class Some<A> {
  readonly _tag = 'Some'
  constructor(readonly value: A) { }
  map<B>(f: (a: A) => B): Option<B> {
    return some(f(this.value))
  }
  fold<R>(f: () => R, g: (a: A) => R): R {
    return g(this.value)
  }
}

type Option<A> = None<A> | Some<A>

const none: Option<never> = new None()
const some = <A>(a: A): Option<A> => new Some(a)

const inverse = (x: number): Option<number> =>
  x === 0 ? none : some(1 / x)

const f = (): string => "cannot divide by zero"
const g = (x: number): string => "the result is " + x

console.log(
inverse(2).fold(f, g) // 'the result is 0.5'
)

console.log(
inverse(0).fold(f, g) // 'cannot divide by zero'
)
