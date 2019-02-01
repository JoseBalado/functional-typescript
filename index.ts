import { some, option } from 'fp-ts/lib/Option'
import { liftA2, sequenceT } from 'fp-ts/lib/Apply'

const fa = some(1)
const fb = some('foo')
const f = (a: number) => (b: string): boolean => a + b.length > 2

const fc1 = some(f)
  .ap_(fa)
  .ap_(fb)
const fc2 = fb.ap(fa.ap(some(f)))
const fc3 = fb.ap(fa.map(f))
const fc4 = liftA2(option)(f)(fa)(fb)
const fc5 = sequenceT(option)(fa, fb).map(([a, b]) => f(a)(b))
