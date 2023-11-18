const DEFAULT_MESSAGE = "invalid";

export function getDishCategoryNameRules(
  requiredMessage?: string,
  maxLengthMessage?: (max: number) => string
) {
  const max = 50;
  return [required(requiredMessage), maxLength(max, maxLengthMessage?.(max))];
}

export function required(message = DEFAULT_MESSAGE) {
  return (val: string) => (val && val.length > 0) || message;
}

export function maxLength(max: number, message = DEFAULT_MESSAGE) {
  if (max <= 0) {
    throw new Error(`max length ${max} must be > 0`);
  }

  return (val: string) => val.length <= max || message;
}
