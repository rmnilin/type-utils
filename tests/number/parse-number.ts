import type { ParseNumber, UnsupportedNumberLiteral } from "@/number";

0 satisfies ParseNumber<"0">;
1 satisfies ParseNumber<"1">;
2 satisfies ParseNumber<"2">;
3 satisfies ParseNumber<"3">;
4 satisfies ParseNumber<"4">;
5 satisfies ParseNumber<"5">;
6 satisfies ParseNumber<"6">;
7 satisfies ParseNumber<"7">;
8 satisfies ParseNumber<"8">;
9 satisfies ParseNumber<"9">;

100 satisfies ParseNumber<"100">;

9007199254740992 satisfies ParseNumber<"9007199254740992">;
90071992547409920 satisfies ParseNumber<"90071992547409920">;

1.0000000000000002 satisfies ParseNumber<"1.0000000000000002">;
0 satisfies ParseNumber<"0">;

-1 satisfies ParseNumber<"-1">;
-42 satisfies ParseNumber<"-42">;

0.01 satisfies ParseNumber<"0.01">;
-0.01 satisfies ParseNumber<"-0.01">;

-0 satisfies ParseNumber<"-0">;

null as UnsupportedNumberLiteral.NaN satisfies ParseNumber<"NaN">;
null as UnsupportedNumberLiteral.NaN satisfies ParseNumber<"-NaN">;
null as UnsupportedNumberLiteral.Infinity satisfies ParseNumber<"Infinity">;
null as UnsupportedNumberLiteral.NegativeInfinity satisfies ParseNumber<"-Infinity">;

let testNever: never[] = [
  null as ParseNumber<"0.0">,
  null as ParseNumber<"-0.0">,
  null as ParseNumber<"1.0">,
  null as ParseNumber<"-1.0">,
  null as ParseNumber<"42.0">,
  null as ParseNumber<"-42.0">,

  null as ParseNumber<"9007199254740993">,
  null as ParseNumber<"1.0000000000000001">,

  null as ParseNumber<"0xff">,

  null as ParseNumber<"1e6">,

  null as ParseNumber<"1_000">,

  null as ParseNumber<"--0">,
  null as ParseNumber<"0..0">,
  null as ParseNumber<"0.0.">,

  null as ParseNumber<"">,
  null as ParseNumber<"error">,
  null as ParseNumber<string>,
];
