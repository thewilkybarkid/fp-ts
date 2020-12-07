/**
 * The `Monad` type class combines the operations of the `Chain` and
 * `Applicative` type classes. Therefore, `Monad` instances represent type
 * constructors which support sequential composition, and also lifting of
 * functions of arbitrary arity.
 *
 * Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:
 *
 * 1. Left identity: `M.chain(M.of(a), f) <-> f(a)`
 * 2. Right identity: `M.chain(fa, M.of) <-> fa`
 *
 * Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`
 *
 * @since 2.0.0
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad<M> extends Functor<M> {
  readonly of: <A>(a: A) => HKT<M, A>
  readonly chain: <A, B>(fa: HKT<M, A>, f: (a: A) => HKT<M, B>) => HKT<M, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad1<M extends URIS> extends Functor1<M> {
  readonly of: <A>(a: A) => Kind<M, A>
  readonly chain: <A, B>(fa: Kind<M, A>, f: (a: A) => Kind<M, B>) => Kind<M, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2<M extends URIS2> extends Functor2<M> {
  readonly of: <E, A>(a: A) => Kind2<M, E, A>
  readonly chain: <E, A, B>(fa: Kind2<M, E, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad2C<M extends URIS2, E> extends Functor2C<M, E> {
  readonly of: <A>(a: A) => Kind2<M, E, A>
  readonly chain: <A, B>(fa: Kind2<M, E, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad3<M extends URIS3> extends Functor3<M> {
  readonly of: <R, E, A>(a: A) => Kind3<M, R, E, A>
  readonly chain: <R, E, A, B>(fa: Kind3<M, R, E, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Monad3C<M extends URIS3, E> extends Functor3C<M, E> {
  readonly of: <R, A>(a: A) => Kind3<M, R, E, A>
  readonly chain: <R, A, B>(fa: Kind3<M, R, E, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Monad4<M extends URIS4> extends Functor4<M> {
  readonly of: <S, R, E, A>(a: A) => Kind4<M, S, R, E, A>
  readonly chain: <S, R, E, A, B>(fa: Kind4<M, S, R, E, A>, f: (a: A) => Kind4<M, S, R, E, B>) => Kind4<M, S, R, E, B>
}
