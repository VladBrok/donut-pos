import { db } from "../index.js";

import { eq } from "drizzle-orm";
import {
  employee,
  permission,
  role,
  roleToPermission,
} from "../../../migrations/schema.js";
import { generateUuid } from "../../lib/uuid.js";
import { EmployeeModel } from "../models.js";
import {
  employeeAdapter,
  employeesManyAdapter,
} from "../schema-to-model-adapters.js";

export async function getAllEmployees(): Promise<EmployeeModel[]> {
  const data = await db
    .select()
    .from(employee)
    .leftJoin(role, eq(employee.roleId, role.id))
    .leftJoin(roleToPermission, eq(employee.roleId, roleToPermission.roleId))
    .leftJoin(permission, eq(roleToPermission.permissionId, permission.id));

  return employeesManyAdapter(data);
}

export async function deleteEmployee(id: string) {
  return await db.delete(employee).where(eq(employee.id, id));
}

export async function createEmployee(
  data: Omit<EmployeeModel, "id" | "permissions">
) {
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(employee).values({
    ...toCreate,
    roleId: data.role.id,
    registeredAt: new Date(data.registeredAt),
  });
  return toCreate;
}

export async function updateEmployee(
  data: Partial<Omit<EmployeeModel, "registeredAt">> & { roleId: string }
) {
  await db
    .update(employee)
    .set(data)
    .where(eq(employee.id, data.id || ""));
  return data;
}

export async function findEmployeeByEmail(email: string) {
  const data = await db
    .select()
    .from(employee)
    .where(eq(employee.email, email))
    .leftJoin(role, eq(employee.roleId, role.id))
    .leftJoin(roleToPermission, eq(employee.roleId, roleToPermission.roleId))
    .leftJoin(permission, eq(roleToPermission.permissionId, permission.id));

  return employeeAdapter(data);
}

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
