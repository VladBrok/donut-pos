import { Action, Server, ServerMeta } from "@logux/server";
import {
  CHANNELS,
  DINING_TABLE_EXISTS,
  createDiningTableAction,
  deleteDiningTableAction,
  diningTableCreatedAction,
  diningTableDeletedAction,
  diningTableUpdatedAction,
  loadDiningTablesAction,
  updateDiningTableAction,
} from "donut-shared";
import * as db from "../db/modules/dining-tables.js";
import { hasAdminPermission } from "../lib/access.js";

export default function diningTablesModule(server: Server) {
  server.channel(CHANNELS.DINING_TABLES, {
    access() {
      return true;
    },
    async load() {
      const tables = await db.getAllDiningTables();
      return loadDiningTablesAction({ tables });
    },
  });

  server.type(createDiningTableAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (
        !(await validateDiningTable(
          server,
          action,
          meta,
          action.payload.table.number
        ))
      ) {
        return;
      }

      const created = await db.createDiningTable(action.payload.table);
      await server.process(
        diningTableCreatedAction({
          table: created,
        })
      );
    },
  });

  server.type(diningTableCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DINING_TABLES;
    },
  });

  server.type(updateDiningTableAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (
        !(await validateDiningTable(
          server,
          action,
          meta,
          action.payload.table.number,
          action.payload.table.id
        ))
      ) {
        return;
      }

      const updated = await db.updateDiningTable(action.payload.table);
      await server.process(
        diningTableUpdatedAction({
          table: updated,
        })
      );
    },
  });

  server.type(diningTableUpdatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DINING_TABLES;
    },
  });

  server.type(deleteDiningTableAction, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      await db.deleteDiningTable(id);
      await server.process(
        diningTableDeletedAction({
          id,
        })
      );
    },
  });

  server.type(diningTableDeletedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DINING_TABLES;
    },
  });
}

async function validateDiningTable(
  server: Server,
  action: Action,
  meta: ServerMeta,
  tableNumber?: string,
  id?: string
) {
  if (!tableNumber) {
    return true;
  }

  const existing = await db.getDiningTableByNumber(tableNumber);

  if (existing && existing.id !== id) {
    server.undo(action, meta, DINING_TABLE_EXISTS);
    return false;
  }

  return true;
}
