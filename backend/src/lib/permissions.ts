import * as db from "../lib/db/index.js";

export async function hasAdminPermission(userId: string): Promise<boolean> {
  const user = await db.findEmployeeById(userId);
  return !!user?.permissions.admin;
}
