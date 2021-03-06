interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

const sum: Semigroup<number> = {
  concat: (x, y) => x + y
}

console.log(
'Sum:',
sum.concat(4, 5)
)

const product: Semigroup<number> = {
  concat: (x, y) => x * y
}

console.log(
'Product:',
product.concat(4, 5)
)

// Exercise 8.1. Implement the following semigroups
// (string, +)
// (boolean, ||)
// (object, ...) (spread operator)

const string: Semigroup<string> = {
  concat: (x, y) => x + y
}

console.log(
'Concat string:',
string.concat('Hello ', 'world!')
)

// (boolean, &&)
const boolean: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

console.log(
'Concat boolean true || false:',
boolean.concat(true, false)
)

// (object, ...) (spread operator)
const object: Semigroup<object> = {
  concat: (x, y) => ({ ...x, ...y })
}

console.log(
'Concat object:',
object.concat({ foo: 'bar', x: 42 }, { foo: 'baz', y: 13 })
)

// 8.5 The fold function
const fold = <A>(S: Semigroup<A>) => (
  a: A,
  as: Array<A>
): A => as.reduce((a, b) => S.concat(a, b), a)

console.log('Fold sum 10 [2,3,4,5]:',
fold(sum)(10, [2,3,4,5])
)

// Semigroup All
const semigroupAll: Semigroup<boolean> = {
  concat: (x, y) => x && y
}

console.log('SemigroupAll true [true, true]:',
fold(semigroupAll)(true, [true, true])
)

console.log('SemigroupAll true, [true, false]:',
fold(semigroupAll)(true, [true, false])
)

// Every
type Predicate<A> = (a: A) => boolean

const every = <A>(p: Predicate<A>, as: Array<A>): boolean =>
fold(semigroupAll)(true, as.map(p))


const odd = (number: number): boolean => number % 2 !== 0

console.log('every(odd, [1,2,3,4]):',
every(odd, [1,2,3,4])
)

// Some
const semigroupAny: Semigroup<boolean> = {
  concat: (x, y) => x || y
}

const some = <A>(p: Predicate<A>, as: Array<A>): boolean =>
  fold(semigroupAny)(false, as.map(p))

console.log('some(odd, [1,2,3,4]):',
some(odd, [1,2,3,4])
)

console.log('some(odd, [4,6]):',
some(odd, [4,6])
)

// Semigroup Object
const semigroupObject: Semigroup<Object> = {
  concat: (x, y) => ({ ...x, ...y })
}

const assign = (as: Array<Object>): Object =>
  fold(semigroupObject)({}, as)

console.log('assign([{ id: 1, name: "John"}, { id: 2, name: "Joe" }]):',
assign([{ id: 3, name: 'John'}, { id: 1, surname: 'Smith' }])
)

// TryFold
class None<A> {
  readonly _tag = 'None'
  map<B>(f: (a: A) => B): Option<B> {
    return optNone
  }
}
class Some<A> {
  readonly _tag = 'Some'
  constructor(readonly value: A) { }
  map<B>(f: (a: A) => B): Option<B> {
    return optSome(f(this.value))
  }
}

type Option<A> = None<A> | Some<A>

const optNone: Option<never> = new None()
const optSome = <A>(a: A): Option<A> => new Some(a)


const tryFold = <A>(S: Semigroup<A>) => (
  as: Array<A>
): Option<A> =>
  as.length === 0 ? optNone : optSome(fold(S)(as[0], as.slice(1)))

console.log("tryFold(sum)([1, 2, 3]):",
tryFold(sum)([1, 2, 3]) // some(6)
)

console.log("tryFold(sum)([]):",
tryFold(sum)([]) // none
)
