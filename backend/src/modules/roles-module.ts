import { Server } from "@logux/server";
import { CHANNELS, loadRolesAction } from "donut-shared";
import * as db from "../db/modules/roles.js";
import { hasAdminPermission, isAdminRole } from "../lib/access.js";

export default function rolesModule(server: Server) {
  server.channel(CHANNELS.ROLES, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async load() {
      const all = await db.getAllRoles();
      const roles = [];
      for (const role of all) {
        if (!(await isAdminRole(role))) {
          roles.push(role);
        }
      }
      return loadRolesAction({ roles });
    },
  });
}
