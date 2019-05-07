type Either<L, A> = Left<L, A> | Right<L, A>

class Left<L, A> {
  readonly _tag = "Left"
  constructor(readonly value: L) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return left(this.value)
  }
}

class Right<L, A> {
  readonly _tag = "Right"
  constructor(readonly value: A) {}
  map<B>(f: (a: A) => B): Either<L, B> {
    return right(f(this.value))
  }
}

const left = <L, A>(l: L): Either<L, A> => new Left(l)
const right = <L, A>(a: A): Either<L, A> => new Right(a)

const double = (x: number): number => x * 2

const inverse = (x: number): Either<string, number> =>
  x === 0 ? left("cannot divide by zero") : right(1 / x)

const doubleInverse = (x: number): Either<string, number> =>
  inverse(x).map(double)

console.log(
doubleInverse(2) // Right(1)
)
  
console.log(
doubleInverse(0) // Left('cannot divide by zero')
)

const inc = (x: number): number => x + 1

console.log(
inverse(0)
  .map(double)
  .map(inc) // Left('cannot divide by zero')
)

console.log(
inverse(4)
  .map(double)
  .map(inc) // Right(1.5)
)
  