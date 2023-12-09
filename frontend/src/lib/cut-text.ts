export function cutText(text: string, maxLength: number): string {
  if (maxLength <= 0) {
    throw new Error(`Max length ${maxLength} should be > 0`);
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
}
