import { Server } from "@logux/server";
import {
  CHANNELS,
  createSalePointAction,
  deleteSalePointAction,
  loadSalePointsAction,
  salePointCreatedAction,
  salePointDeletedAction,
  salePointUpdatedAction,
  updateSalePointAction,
} from "donut-shared";
import * as db from "../db/modules/sale-points.js";
import { hasAdminPermission } from "../lib/access.js";

export default function salePointsModule(server: Server) {
  server.channel(CHANNELS.SALE_POINTS, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async load() {
      const salePoints = await db.getAllSalePoints();
      return loadSalePointsAction({ salePoints });
    },
  });

  server.type(createSalePointAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const created = await db.createSalePoint(action.payload.salePoint);
      await server.process(
        salePointCreatedAction({
          salePoint: created,
        })
      );
    },
  });

  server.type(salePointCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.SALE_POINTS;
    },
  });

  server.type(updateSalePointAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const updated = await db.updateSalePoint(action.payload.salePoint);
      await server.process(
        salePointUpdatedAction({
          salePoint: updated,
        })
      );
    },
  });

  server.type(salePointUpdatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.SALE_POINTS;
    },
  });

  server.type(deleteSalePointAction, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      await db.deleteSalePoint(id);
      await server.process(
        salePointDeletedAction({
          id,
        })
      );
    },
  });

  server.type(salePointDeletedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.SALE_POINTS;
    },
  });
}
