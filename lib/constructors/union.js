// @flow

/* eslint-disable no-redeclare */

import { Schema } from '../Schema';
import { ValidationError } from '../ValidationError';

declare function union<A>(a: Schema<A>): Schema<A>; /* prettier-ignore */
declare function union<A, B>(a: Schema<A>, b: Schema<B>): Schema<A | B>; /* prettier-ignore */
declare function union<A, B, C>(a: Schema<A>, b: Schema<B>, c: Schema<C>): Schema<A | B | C>; /* prettier-ignore */
declare function union<A, B, C, D>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>): Schema<A | B | C | D>; /* prettier-ignore */
declare function union<A, B, C, D, E>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>): Schema<A | B | C | D | E>; /* prettier-ignore */
declare function union<A, B, C, D, E, F>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>): Schema<A | B | C | D | E | F>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>): Schema<A | B | C | D | E | F | G>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>): Schema<A | B | C | D | E | F | G | H>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>): Schema<A | B | C | D | E | F | G | H | I>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>): Schema<A | B | C | D | E | F | G | H | I | J>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>): Schema<A | B | C | D | E | F | G | H | I | J | K>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>): Schema<A | B | C | D | E | F | G | H | I | J | K | L>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>, u: Schema<U>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>, u: Schema<U>, v: Schema<V>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>, u: Schema<U>, v: Schema<V>, w: Schema<W>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>, u: Schema<U>, v: Schema<V>, w: Schema<W>, x: Schema<X>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>, u: Schema<U>, v: Schema<V>, w: Schema<W>, x: Schema<X>, y: Schema<Y>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y>; /* prettier-ignore */
declare function union<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(a: Schema<A>, b: Schema<B>, c: Schema<C>, d: Schema<D>, e: Schema<E>, f: Schema<F>, g: Schema<G>, h: Schema<H>, i: Schema<I>, j: Schema<J>, k: Schema<K>, l: Schema<L>, m: Schema<M>, n: Schema<N>, o: Schema<O>, p: Schema<P>, q: Schema<Q>, r: Schema<R>, s: Schema<S>, t: Schema<T>, u: Schema<U>, v: Schema<V>, w: Schema<W>, x: Schema<X>, y: Schema<Y>, z: Schema<Z>): Schema<A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z>; /* prettier-ignore */
export function union(...schemas) {
  const name = schemas
    .map(schema => {
      // If the inner schema contains an intersection or union, wrap it in parenthesis
      if (schema.name.includes('&') || schema.name.includes('|')) {
        if (schema.name.includes('\n')) {
          return `(\n  ${schema.name.replace(/\n/g, '\n  ')}\n)`;
        }
        return `(${schema.name})`;
      } else {
        return schema.name;
      }
    })
    .join(' | ');
  return new Schema({
    name,
    validate: value => {
      const errors: Array<ValidationError> = [];

      for (const schema of schemas) {
        try {
          return schema.validate(value);
        } catch (error) {
          if (!(error instanceof ValidationError)) {
            throw error;
          }
          errors.push(error);
        }
      }
      throw new ValidationError();
    },
  });
}
