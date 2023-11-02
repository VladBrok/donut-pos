import bcrypt from "bcrypt";

export async function hash(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

export async function compareWithHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
