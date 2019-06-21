interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

class None<A> {
  readonly _tag = 'None'
  map<B>(f: (a: A) => B): Option<B> {
    return none
  }
  fold(x :any, y: any): any {
    return undefined
  } 
}
class Some<A> {
  readonly _tag = 'Some'
  constructor(readonly value: A) { }
  map<B>(f: (a: A) => B): Option<B> {
    return some(f(this.value))
  }
  fold(x :any, y: any): any {
    return undefined
  } 
}

type Option<A> = None<A> | Some<A>

const none: Option<never> = new None()
const some = <A>(a: A): Option<A> => new Some(a)

const getOptionSemigroup = <A>(
  S: Semigroup<A>
): Semigroup<Option<A>> => ({
  concat: (x, y) =>
    x.fold(
      () => y,
      ax => y.fold(() => x, ay => some(S.concat(ax, ay)))
    )
})

