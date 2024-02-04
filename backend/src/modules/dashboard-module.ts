import { Server } from "@logux/server";
import { CHANNELS } from "donut-shared";
import { adminDashboardLoadedAction } from "donut-shared/src/actions/dashboard.js";
import { hasAdminPermission } from "src/lib/access.js";
import * as db from "../db/modules/dashboard.js";

export default function dashboardModule(server: Server) {
  server.channel(CHANNELS.ADMIN_DASHBOARD, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async load(ctx, action, meta) {
      const data = await db.getAdminDashboardData();
      return adminDashboardLoadedAction({
        data: data,
      });
    },
  });
}
