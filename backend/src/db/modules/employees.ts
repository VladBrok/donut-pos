import { db } from "../index.js";

import { eq } from "drizzle-orm";
import {
  employee,
  permission,
  role,
  roleToPermission,
} from "../../../migrations/schema.js";
import { hasAdminPermission } from "../../lib/permissions.js";
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
  // TODO: move this logic to logux
  const isAdmin = await hasAdminPermission(id);

  if (isAdmin) {
    throw new Error(
      `Employee with id ${id} has admin permissions and thus can't be deleted.`
    );
  }

  return await db.delete(employee).where(eq(employee.id, id));
}

export async function createEmployee(data: Omit<EmployeeModel, "id">) {
  // TODO: add to logux logic that Admin can't be created
  const toCreate = { id: generateUuid(), ...data };
  await db.insert(employee).values({
    ...toCreate,
    roleId: data.role.id,
  });
  return toCreate;
}

export async function updateEmployee(
  data: Partial<EmployeeModel> & { roleId: string }
) {
  // TODO: add to logux logic that Admin can't be updated
  await db
    .update(employee)
    .set({
      ...data,
    })
    .where(eq(employee.id, data.id || ""));
  return data;
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
