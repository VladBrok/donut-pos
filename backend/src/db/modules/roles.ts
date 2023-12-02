import { eq } from "drizzle-orm";
import { role } from "../../../migrations/schema.js";
import { db } from "../index.js";
import { RoleModel } from "../models.js";
import { roleAdapter } from "../schema-to-model-adapters.js";

export async function getAllRoles(): Promise<RoleModel[]> {
  const data = await db.select().from(role);

  return roleAdapter(data);
}

export async function findRoleById(id: string) {
  const data = await db.select().from(role).where(eq(role.id, id));

  if (!data[0]) {
    return null;
  }

  return roleAdapter(data)[0];
}
