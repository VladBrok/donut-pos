import { Server } from "@logux/server";
import {
  CHANNELS,
  deleteDishCategoryAction,
  loadDishCategoriesAction,
} from "donut-shared";
import { deletedDishCategoryAction } from "donut-shared/src/actions.js";
import { DISH_CATEGORY_NOT_FOUND } from "donut-shared/src/errors.js";
import * as db from "../lib/db/index.js";

export default function dishCategoriesModule(server: Server) {
  server.channel(CHANNELS.DISH_CATEGORIES, {
    access() {
      return true;
    },
    async load() {
      const categories = await db.getAllDishCategories();
      return loadDishCategoriesAction({ categories });
    },
  });

  server.type(deleteDishCategoryAction, {
    async access(ctx, action, meta) {
      // TODO: extract
      const user = await db.findEmployeeById(ctx.userId);
      return !!user?.permissions.admin;
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      // TODO: use real id
      const deleted = await db.deleteDishCategory(
        "7db7a9bc-8323-11ee-b962-0242ac120002"
      );

      if (!deleted.length) {
        await server.undo(action, meta, DISH_CATEGORY_NOT_FOUND);
        return;
      }

      await server.process(
        deletedDishCategoryAction({
          id,
        })
      );
    },
  });

  server.type(deletedDishCategoryAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISH_CATEGORIES;
    },
  });
}
