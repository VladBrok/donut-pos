export function formatCurrency(value: number) {
  const result: string = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);

  return result;
}
