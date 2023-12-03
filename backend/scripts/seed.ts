import {
  EMPLOYEE_ROLES_ARR,
  ORDER_STATUSES_ARR,
} from "donut-shared/src/constants.js";
import { logInfo } from "donut-shared/src/lib/log.js";
import { eq } from "drizzle-orm";
import {
  orderStatus,
  permission,
  role,
  roleToPermission,
} from "../migrations/schema.js";
import * as database from "../src/db/index.js";
import { generateUuid } from "../src/lib/uuid.js";

await database.connect();
const db = database.db;

// Roles & permissions

db.delete(roleToPermission).where(eq(roleToPermission.id, roleToPermission.id));
db.delete(role).where(eq(role.id, role.id));
db.delete(permission).where(eq(permission.id, permission.id));

for (const roleName of EMPLOYEE_ROLES_ARR) {
  const roleId = generateUuid();
  const permId = generateUuid();
  await db.insert(role).values({
    id: roleId,
    codeName: roleName,
  });
  await db.insert(permission).values({
    id: permId,
    codeName: roleName,
  });
  await db.insert(roleToPermission).values({
    id: generateUuid(),
    permissionId: permId,
    roleId: roleId,
  });
}

// Order statuses

db.delete(orderStatus);

for (const status of ORDER_STATUSES_ARR) {
  await db.insert(orderStatus).values({
    id: generateUuid(),
    codeName: status,
  });
}

logInfo("seeding complete.");
