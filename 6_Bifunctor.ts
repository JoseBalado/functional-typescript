interface Bifunctor<F> {
  bimap: <L, A, M, B>(
    fla: F<L, A>,
    f: (l: L) => M,
    g: (a: A) => B
  ) => F<M, B>
}

const bimap = <L, V, A, B>(
  fla: Either<L, A>,
  f: (l: L) => V,
  g: (a: A) => B
): Either<V, B> => {
  return fla.fold(l => left(f(l))), a => a => right(g(a)))
}
