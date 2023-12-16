import { takeRandom } from "src/lib/random.js";

export function generateOrderNumber() {
  const now = new Date();
  const day = now.getUTCDate().toString().padStart(2, "0");
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = now.getUTCFullYear().toString().slice(-2);
  const ALLOWED = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const tail = Array(4)
    .fill("")
    .map(() => takeRandom(ALLOWED))
    .join("");
  return `${day}-${month}-${year}-${tail}`;
}
