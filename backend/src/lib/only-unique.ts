export function onlyUnique<T>(getId: (item: T) => string) {
  return (value: T, index: number, array: T[]) =>
    array.findIndex((x) => getId(x) === getId(value)) === index;
}
