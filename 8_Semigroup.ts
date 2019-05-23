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

