let idx = 36;
let hex = "";
while (idx) {
  hex += idx.toString(36);
  idx--;
}

export function generateRandomId(length = 12): string {
  if (length < 0) {
    throw new Error(`Length ${length} is less than zero.`);
  }

  let result = "";
  while (length) {
    const hexIdx = Math.floor(Math.random() * 36);
    result += hex[hexIdx];
    length--;
  }

  return result;
}
