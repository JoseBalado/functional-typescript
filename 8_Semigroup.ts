interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

const sum: Semigroup<number> = {
  concat: (x, y) => x + y
}

