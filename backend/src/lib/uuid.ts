import crypto from "crypto";

export function generateUuid() {
  return crypto.randomUUID();
}
