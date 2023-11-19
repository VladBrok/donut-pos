import { Server } from "@logux/server";
import {
  deleteDishAction,
  dishDeletedAction,
  loadDishesAction,
} from "donut-shared/src/actions.js";
import { CHANNELS } from "donut-shared/src/constants.js";
import * as db from "../lib/db/index.js";
import { hasAdminPermission } from "../lib/permissions.js";

export default function dishesModule(server: Server) {
  server.channel(CHANNELS.DISHES, {
    access() {
      return true;
    },
    async load() {
      const dishes = await db.getAllDishes();
      return loadDishesAction({ dishes });
    },
  });

  server.type(deleteDishAction, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      await db.deleteDish(id);
      await server.process(
        dishDeletedAction({
          id,
        })
      );
    },
  });

  server.type(dishDeletedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISHES;
    },
  });
}
