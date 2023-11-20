import * as db from "./db/modules/employees.js";

export async function hasAdminPermission(userId: string): Promise<boolean> {
  const user = await db.findEmployeeById(userId);
  return !!user?.permissions.admin;
}
