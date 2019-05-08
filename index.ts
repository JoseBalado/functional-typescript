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

// Identity Functor
class Identity<A> {
  constructor(readonly value: A) { }
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }
}

interface User {
  name: string
}

const identity = new Identity(5)
const identity2 = new Identity({ name: 'John', surname: 'Doe' })

const nameLength = (text : User): number => text.name.length

console.log(identity)
console.log(identity2)

console.log(
identity
  .map(double)
)

console.log(
identity2
  .map(nameLength)
)

// Functor Array
const functorArray = {
  map: <A, B>(f: (a: A) => B, fa: Array<A>): Array<B> =>
    fa.map(f)
}

const arrayNumbers: Array<number> = [1,2,3]

const addOne = (x : number): number => x + 1

console.log('functorArray',
functorArray.map(addOne, arrayNumbers)
)

// Functor IO
class IO<A> {
  constructor(readonly run: () => A) { }
  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
  }
}
