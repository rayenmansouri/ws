// Utility: Recursively convert all Date to string
export type ReplaceDatesWithStrings<T> = T extends Date
  ? string
  : T extends (infer U)[]
  ? ReplaceDatesWithStrings<U>[]
  : T extends object
  ? { [K in keyof T]: ReplaceDatesWithStrings<T[K]> }
  : T;

