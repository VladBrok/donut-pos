export function getRandomInteger(
  minInclusive: number,
  maxExclusive: number
): number {
  return Math.floor(
    minInclusive + Math.random() * (maxExclusive - minInclusive)
  );
}

export function takeRandom<T>(arr: T[] | string): T | string {
  if (arr.length < 1) {
    throw new Error(`Array length ${arr.length} is less than 1.`);
  }

  const idx = getRandomInteger(0, arr.length);
  return arr[idx];
}
