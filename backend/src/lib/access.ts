import { EmployeeModel, RoleModel } from "../db/models.js";
import * as employeeDb from "../db/modules/employees.js";
import * as roleDb from "../db/modules/roles.js";

export async function hasAdminPermission(
  data: string | EmployeeModel
): Promise<boolean> {
  const employee =
    typeof data === "string" ? await employeeDb.findEmployeeById(data) : data;
  return !!employee?.permissions.admin;
}

export async function isAdminRole(data: string | RoleModel): Promise<boolean> {
  const role =
    typeof data === "string" ? await roleDb.findRoleById(data) : data;
  return role?.codeName === "admin";
}
