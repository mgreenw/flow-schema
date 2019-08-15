/* eslint-disable no-redeclare */
// @flow

declare function arity<Fn: (...args: [$NonMaybeType<mixed>]) => any>(fn: Fn): 0
declare function arity<Fn: (...args: [void, $NonMaybeType<mixed>]) => any>(fn: Fn): 1
declare function arity<Fn: (...args: [void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 2
declare function arity<Fn: (...args: [void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 3
declare function arity<Fn: (...args: [void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 4
declare function arity<Fn: (...args: [void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 5
declare function arity<Fn: (...args: [void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 6
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 7
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 8
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 9
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 10
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 11
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 12
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 13
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 14
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 15
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 16
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 17
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 18
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 19
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 20
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 21
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 22
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 23
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 24
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 25
declare function arity<Fn: (...args: [void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, void, $NonMaybeType<mixed>]) => any>(fn: Fn): 26

declare function arity<Fn: (...args: [any, $NonMaybeType<mixed>]) => any>(fn: Fn): 1
declare function arity<Fn: (...args: [any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 2
declare function arity<Fn: (...args: [any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 3
declare function arity<Fn: (...args: [any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 4
declare function arity<Fn: (...args: [any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 5
declare function arity<Fn: (...args: [any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 6
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 7
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 8
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 9
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 10
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 11
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 12
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 13
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 14
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 15
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 16
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 17
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 18
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 19
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 20
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 21
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 22
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 23
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 24
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 25
declare function arity<Fn: (...args: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, $NonMaybeType<mixed>]) => any>(fn: Fn): 26


export type _Arity = typeof arity

export type Arity<Fn> = $Call<_Arity, Fn>