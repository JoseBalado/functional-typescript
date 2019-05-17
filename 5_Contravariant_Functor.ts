// Contravariant Functor
type Predicate<A> = (a: A) => boolean

const contramap = <A, B>(
  f: (b: B) => A,
  predicate: Predicate<A>
  ): Predicate<B> => {
    return b => predicate(f(b))
  }

const isAdult: Predicate<number> = age => age >= 18

interface Person {
  name: string
  age: number
}

const isPersonAdult: Predicate<Person> = contramap(
  p => p.age,
  isAdult
)

console.log(
isPersonAdult({ name: 'Giulio', age: 45 })
)

console.log(
isPersonAdult({ name: 'Matilde', age: 2 })
)