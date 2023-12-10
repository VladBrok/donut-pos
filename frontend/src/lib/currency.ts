export function wholeToFractional(whole: number) {
  return whole * 100;
}

export function fractionalToWhole(fractional: number) {
  return fractional / 100;
}

export function formatCurrency(fractional: number) {
  const result: string = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(fractionalToWhole(fractional));

  return result;
}
