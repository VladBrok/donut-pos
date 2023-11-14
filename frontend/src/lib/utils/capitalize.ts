export function capitalize(str: string) {
  if (!str.length) {
    return;
  }

  return str[0].toUpperCase() + str.slice(1);
}
