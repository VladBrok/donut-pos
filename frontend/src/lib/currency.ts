export function wholeToFractional(whole: number) {
  return whole * 100;
}

export function fractionalToWhole(fractional: number) {
  return fractional / 100;
}

export function formatCurrency(fractional: number, showSymbol = true) {
  const result: string = new Intl.NumberFormat("pl-PL", {
    ...(showSymbol && { style: "currency" }),
    ...(showSymbol && { currency: "PLN" }),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(fractionalToWhole(fractional));

  return result;
}
