import { EmployeeModel } from "../db/models.js";
import * as db from "../db/modules/employees.js";

export async function hasAdminPermission(
  data: string | EmployeeModel
): Promise<boolean> {
  const employee =
    typeof data === "string" ? await db.findEmployeeById(data) : data;
  return !!employee?.permissions.admin;
}

export async function isAdminRole(roleId: string): Promise<boolean> {
  const role = await db.findRoleById(roleId);
  return role?.codeName === "admin";
}
