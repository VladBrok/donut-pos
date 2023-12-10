import { ICurrentOrder } from "donut-shared";
import { generateUuid } from "../../lib/uuid.js";
import { db } from "../index.js";

export async function createOrder(data: ICurrentOrder) {
  const toCreate = { id: generateUuid(), ...data };
  await db.transaction(async (tx) => {
    // TODO: create an order
  });
  // TODO: select created and return it because the structure would be different (maybe...)
  return toCreate;
}
