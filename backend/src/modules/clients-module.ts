import { Server } from "@logux/server";
import {
  CHANNELS,
  ITEMS_PER_PAGE,
  clientsPageLoadedAction,
  loadClientsPageAction,
} from "donut-shared";
import { hasAdminPermission } from "src/lib/access.js";
import * as db from "../db/modules/clients.js";

export default function clientsModule(server: Server) {
  server.channel(CHANNELS.CLIENTS, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async load(ctx, action, meta) {
      const { clientsPage, total } = await db.getClientsPage({
        page: 1,
        perPage: ITEMS_PER_PAGE,
      });
      return clientsPageLoadedAction({
        totalClients: total,
        clientsPage: clientsPage,
      });
    },
  });

  server.type(loadClientsPageAction, {
    async access(ctx) {
      return true;
    },
    async process(ctx, action, meta) {
      const { clientsPage, total } = await db.getClientsPage({
        page: action.payload.page,
        perPage: ITEMS_PER_PAGE,
        search: action.payload.search,
      });
      await ctx.sendBack(
        clientsPageLoadedAction({
          clientsPage: clientsPage,
          totalClients: total,
        })
      );
    },
  });
}
