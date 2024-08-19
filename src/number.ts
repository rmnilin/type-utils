export enum UnsupportedNumberLiteral {
  NaN,
  Infinity,
  NegativeInfinity,
}

/**
 * @param {string} Input String literal representing a number.
 * @returns {number} Parsed literal number or {@link UnsupportedNumberLiteral}
 *     for numbers that TypeScript doesn't support: `NaN`, `Infinity`, and `-Infinity`.
 * @throws Will throw `never` for integers that are explicitly specified as floats, e.g. `"1.0"`,\
 *     numbers, that cannot be exactly represented in double-precision floating-point format
 *     (e.g. odd integers between `2 ** 53` and `2 ** 54`),\
 *     numbers in non-decimal representation like `"0xff"`,\
 *     scientific representation like `"1e6"`,\
 *     represented with numeric separators like `"1_000"`,\
 *     and all the rest invalid types like `"--0.0"`, `string`, `""`, `"error"`, etc.
 */
export type ParseNumber<Input extends string> =
  Input extends `${infer Parsed extends number}`
    ? number extends Parsed
      ? Input extends "-0"
        ? -0
        : never
      : Parsed
    : Input extends "NaN" | "-NaN"
    ? UnsupportedNumberLiteral.NaN
    : Input extends "Infinity"
    ? UnsupportedNumberLiteral.Infinity
    : Input extends "-Infinity"
    ? UnsupportedNumberLiteral.NegativeInfinity
    : never;

export type Digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export type Digit = Digits[number];

export type Increment<Input extends number> =
  `${Input}` extends `${infer Head}${Digit}`
    ? `${Input}` extends `${Head}${infer LastDigitString}`
      ? ParseNumber<LastDigitString> extends infer LastDigit
        ? LastDigit extends number
          ? LastDigit extends 9
            ? Head extends ""
              ? 10
              : ParseNumber<`${Increment<ParseNumber<Head>>}0`>
            : ParseNumber<`${Head}${Digits[LastDigit]}`>
          : never
        : never
      : never
    : never;

export type Decrement<Input extends number> =
  `${Input}` extends `${infer Head}${Digit}`
    ? `${Input}` extends `${Head}${infer LastDigitString}`
      ? ParseNumber<LastDigitString> extends infer LastDigit
        ? LastDigit extends number
          ? LastDigit extends 0
            ? Head extends "1"
              ? 9
              : ParseNumber<`${Decrement<ParseNumber<Head>>}9`>
            : ParseNumber<`${Head}${[never, 0, ...Digits][LastDigit]}`>
          : never
        : never
      : never
    : never;
