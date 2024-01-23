import { EmployeeModel, RoleModel } from "../db/models.js";
import * as employeeDb from "../db/modules/employees.js";
import * as roleDb from "../db/modules/roles.js";

async function hasPermission(
  data: string | EmployeeModel,
  check: (employee: EmployeeModel | null) => boolean
) {
  const employee =
    typeof data === "string" ? await employeeDb.findEmployeeById(data) : data;
  return check(employee);
}

export async function hasAdminPermission(
  data: string | EmployeeModel
): Promise<boolean> {
  return await hasPermission(data, (employee) => !!employee?.permissions.admin);
}

export async function hasWaiterPermission(data: string | EmployeeModel) {
  return await hasPermission(
    data,
    (employee) => !!employee?.permissions.waiter
  );
}

export async function hasWaiterOrCourierPermission(
  data: string | EmployeeModel
) {
  return await hasPermission(
    data,
    (employee) =>
      !!employee?.permissions.waiter || !!employee?.permissions.courier
  );
}

export async function hasCookPermissions(data: string | EmployeeModel) {
  return await hasPermission(data, (employee) => !!employee?.permissions.cook);
}

export async function hasCourierPermission(data: string | EmployeeModel) {
  return await hasPermission(
    data,
    (employee) => !!employee?.permissions.courier
  );
}

export async function isAdminRole(data: string | RoleModel): Promise<boolean> {
  const role =
    typeof data === "string" ? await roleDb.findRoleById(data) : data;
  return role?.codeName === "admin";
}
