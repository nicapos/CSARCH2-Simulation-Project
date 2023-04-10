import { DecimalRepr, RoundingMethod } from "../react-app-env";

function countDigits(num) {
  return String(num).replace(/[^\d]/g, '').length;
}

export function round(num, method) {
  return num; // TODO: replace with computed value
}

// TODO: Feel free to rename if ever. Convert to cohort with 7 digits
export function normalize({ coefficient, exponent }, roundingMethod) {
  var coeff = coefficient;
  var exp = exponent;

  if (countDigits(coefficient) <= 7) {
    while (coeff < 1e6) {
      coeff *= 10;
      exp -= 1;
    }
  } else {
    while (coeff % 10 === 0 && coeff >= 1e7) {
      coeff /= 10;
      exp += 1;
    }

    if (countDigits(coeff) > 7) {
      coeff = round(coeff, roundingMethod);
    }
  }

  return {
    coefficient: coeff,
    exponent: exp
  };
}

export function toFloatingPointRepr() {
  // TODO
}

// Add more functions below if needed