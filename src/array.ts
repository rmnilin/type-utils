import type { Decrement } from "./number.js";

export type Take<Input extends any[], Count extends number> = Count extends 0
  ? []
  : Input extends []
  ? never
  : Input extends [infer Head, ...infer Tail]
  ? [Head, ...Take<Tail, Decrement<Count>>]
  : [];

let a: Take<["a", "b", "c"], 4>;

export type Reverse<Input extends any[]> = Input extends [
  infer Head,
  ...infer Tail
]
  ? [...Reverse<Tail>, Head]
  : [];
