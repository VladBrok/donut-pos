import { Action, Server, ServerMeta } from "@logux/server";
import { CHANNELS, EMPLOYEE_WITH_EMAIL_EXISTS } from "donut-shared";
import {
  createEmployeeAction,
  deleteEmployeeAction,
  employeeCreatedAction,
  employeeDeletedAction,
  employeeUpdatedAction,
  loadEmployeesAction,
  updateEmployeeAction,
} from "donut-shared/src/actions/employees.js";
import { EmployeeModel } from "../db/models.js";
import * as db from "../db/modules/employees.js";
import { hasAdminPermission, isAdminRole } from "../lib/access.js";
import { hash } from "../lib/crypt.js";

export default function employeesModule(server: Server) {
  server.channel(CHANNELS.EMPLOYEES, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async load() {
      const all = await db.getAllEmployees();
      const result = [];
      for (const employee of all) {
        if (!(await hasAdminPermission(employee))) {
          delete employee.passwordHash;
          result.push(employee);
        }
      }
      return loadEmployeesAction({ employees: result });
    },
  });

  server.type(createEmployeeAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (await isAdminRole(action.payload.role.id)) {
        await server.undo(action, meta, "Admin cannot be created");
        return;
      }

      if (
        !(await validateEmployeeEmail(
          server,
          action,
          meta,
          action.payload.email
        ))
      ) {
        return;
      }

      const created = await db.createEmployee({
        ...action.payload,
        passwordHash: await hash(action.payload.password),
        registeredAt: new Date().toISOString(),
        isPhoneVerified: false,
        isEmailVerified: false,
        phone: "",
      });
      await server.process(employeeCreatedAction(created));
    },
  });

  server.type(employeeCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.EMPLOYEES;
    },
  });

  server.type(updateEmployeeAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (await hasAdminPermission(action.payload.id)) {
        await server.undo(action, meta, "Admin cannot be updated");
        return;
      }

      if (await isAdminRole(action.payload.role.id)) {
        await server.undo(action, meta, "Role cannot be changed to admin");
        return;
      }

      if (
        !(await validateEmployeeEmail(
          server,
          action,
          meta,
          action.payload.email,
          action.payload.id
        ))
      ) {
        return;
      }

      const toUpdate: Partial<EmployeeModel> & {
        roleId: string;
        password?: string;
      } = {
        ...action.payload,
        roleId: action.payload.role.id,
        ...(action.payload.password && {
          passwordHash: await hash(action.payload.password),
        }),
      };
      const updated = structuredClone(toUpdate);
      delete toUpdate.role;
      delete toUpdate.registeredAt;
      delete toUpdate.password;
      await db.updateEmployee(toUpdate);
      await server.process(employeeUpdatedAction(updated));
    },
  });

  server.type(employeeUpdatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.EMPLOYEES;
    },
  });

  server.type(deleteEmployeeAction, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (await hasAdminPermission(action.payload.id)) {
        await server.undo(action, meta, "Admin cannot be deleted");
        return;
      }

      const id = action.payload.id;
      await db.deleteEmployee(id);
      await server.process(
        employeeDeletedAction({
          id,
        })
      );
    },
  });

  server.type(employeeDeletedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.EMPLOYEES;
    },
  });
}

async function validateEmployeeEmail(
  server: Server,
  action: Action,
  meta: ServerMeta,
  email?: string,
  id?: string
) {
  if (!email) {
    return true;
  }

  const existing = await db.findEmployeeByEmail(email);

  if (existing && existing.id !== id) {
    server.undo(action, meta, EMPLOYEE_WITH_EMAIL_EXISTS);
    return false;
  }

  return true;
}
