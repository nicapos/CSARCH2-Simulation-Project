/// <reference types="react-scripts" />

export enum RoundingMethod {
  TRUNCATE = "truncate",
  ROUND_DOWN = "round down",
  ROUND_UP = "round up",
  RTN_TE = "round to nearest (ties to even)"
};

export type DecimalRepr = {
  coefficient: number | NaN;
  exponent: number | NaN;
};