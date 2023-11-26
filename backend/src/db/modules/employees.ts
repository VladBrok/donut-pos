import { db } from "../index.js";

import { eq } from "drizzle-orm";
import {
  employee,
  permission,
  role,
  roleToPermission,
} from "../../../migrations/schema.js";
import { EmployeeModel } from "../models.js";
import { employeeAdapter } from "../schema-to-model-adapters.js";

export async function findEmployeeByPhone(phone: string) {
  const data = await db
    .select()
    .from(employee)
    .where(eq(employee.phone, phone))
    .leftJoin(role, eq(employee.roleId, role.id))
    .leftJoin(roleToPermission, eq(employee.roleId, roleToPermission.roleId))
    .leftJoin(permission, eq(roleToPermission.permissionId, permission.id));

  return employeeAdapter(data);
}

export async function findEmployeeById(
  id: string
): Promise<EmployeeModel | null> {
  const data = await db
    .select()
    .from(employee)
    .where(eq(employee.id, id))
    .leftJoin(role, eq(employee.roleId, role.id))
    .leftJoin(roleToPermission, eq(employee.roleId, roleToPermission.roleId))
    .leftJoin(permission, eq(roleToPermission.permissionId, permission.id));

  return employeeAdapter(data);
}
