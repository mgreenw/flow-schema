// @flow

import type { Arity } from './Arity';

type Extract1 = <A, Fn: (A) => any>(Fn) => ([A & A])
type Extract2 = <A, B, Fn: (A, B) => any>(Fn) => ([A & A, B & B])
type Extract3 = <A, B, C, Fn: (A, B, C) => any>(Fn) => ([A & A, B & B, C & C])
type Extract4 = <A, B, C, D, Fn: (A, B, C, D) => any>(Fn) => ([A & A, B & B, C & C, D & D])
type Extract5 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract6 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract7 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract8 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract9 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract10 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract11 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract12 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract13 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract14 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract15 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract16 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract17 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract18 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract19 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract20 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract21 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract22 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract23 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract24 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract25 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])
type Extract26 = <A, B, C, D, E, Fn: (A, B, C, D, E) => any>(Fn) => ([A & A, B & B, C & C, D & D, E & E])

/**
 * The trick with the intersection helps to locate errors better
 *
 * TODO: add some examples and explanation how it works
 */

type Helper<Fn> = (
  & ((0) => [])
  & ((1) => $Call<Extract1 & Extract1, Fn>)
  & ((2) => $Call<Extract2 & Extract2, Fn>)
  & ((3) => $Call<Extract3 & Extract3, Fn>)
  & ((4) => $Call<Extract4 & Extract4, Fn>)
  & ((5) => $Call<Extract5 & Extract5, Fn>)
  & ((6) => $Call<Extract6 & Extract6, Fn>)
  & ((7) => $Call<Extract7 & Extract7, Fn>)
  & ((8) => $Call<Extract8 & Extract8, Fn>)
  & ((9) => $Call<Extract9 & Extract9, Fn>)
  & ((10) => $Call<Extract10 & Extract10, Fn>)
  & ((11) => $Call<Extract11 & Extract11, Fn>)
  & ((12) => $Call<Extract12 & Extract12, Fn>)
  & ((13) => $Call<Extract13 & Extract13, Fn>)
  & ((14) => $Call<Extract14 & Extract14, Fn>)
  & ((15) => $Call<Extract15 & Extract15, Fn>)
  & ((16) => $Call<Extract16 & Extract16, Fn>)
  & ((17) => $Call<Extract17 & Extract17, Fn>)
  & ((18) => $Call<Extract18 & Extract18, Fn>)
  & ((19) => $Call<Extract19 & Extract19, Fn>)
  & ((20) => $Call<Extract20 & Extract20, Fn>)
  & ((21) => $Call<Extract21 & Extract21, Fn>)
  & ((22) => $Call<Extract22 & Extract22, Fn>)
  & ((23) => $Call<Extract23 & Extract23, Fn>)
  & ((24) => $Call<Extract24 & Extract24, Fn>)
  & ((25) => $Call<Extract25 & Extract25, Fn>)
  & ((26) => $Call<Extract26 & Extract26, Fn>)
)

export type Arguments<Fn> = ($Call<(Helper<Fn>), Arity<Fn>>);
