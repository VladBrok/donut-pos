import { Server } from "@logux/server";
import {
  createEmployeeAction,
  deleteEmployeeAction,
  employeeCreatedAction,
  employeeDeletedAction,
  employeeUpdatedAction,
  loadEmployeesAction,
  updateEmployeeAction,
} from "donut-shared/src/actions/employees.js";
import { CHANNELS } from "donut-shared/src/constants.js";
import { EmployeeModel } from "../db/models.js";
import * as db from "../db/modules/employees.js";
import { hasAdminPermission, isAdminRole } from "../lib/access.js";
import { hash } from "../lib/crypt.js";

// TODO: test special behaviour related to Admin

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

      const created = await db.createEmployee({
        ...action.payload,
        passwordHash: await hash(action.payload.password),
        registeredAt: new Date().toISOString(),
        isPhoneVerified: false,
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
      if (
        (await hasAdminPermission(action.payload.id)) ||
        (await isAdminRole(action.payload.role.id))
      ) {
        await server.undo(action, meta, "Admin cannot be updated");
        return;
      }

      const toUpdate: Partial<EmployeeModel> & {
        roleId: string;
      } = {
        ...action.payload,
        roleId: action.payload.role.id,
        passwordHash: await hash(action.payload.password),
      };
      const updated = structuredClone(toUpdate);
      delete toUpdate.role;
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
