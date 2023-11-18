import { Server } from "@logux/server";
import {
  CHANNELS,
  deleteDishCategoryAction,
  loadDishCategoriesAction,
} from "donut-shared";
import {
  createDishCategoryAction,
  dishCategoryCreatedAction,
  dishCategoryDeletedAction,
  dishCategoryUpdatedAction,
  updateDishCategoryAction,
} from "donut-shared/src/actions.js";
import { IMAGE_UPLOAD_FAIL } from "donut-shared/src/errors.js";
import { logError } from "donut-shared/src/log.js";
import * as db from "../lib/db/index.js";
import { uploadImage } from "../lib/images.js";
import { hasAdminPermission } from "../lib/permissions.js";

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

  server.type(createDishCategoryAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      let uploadedImage = null;
      try {
        uploadedImage = await uploadImage(action.payload.imageBase64);
      } catch (e) {
        logError(e);
        await server.undo(action, meta, IMAGE_UPLOAD_FAIL);
        return;
      }

      const created = await db.createDishCategory({
        ...action.payload,
        imageUrl: uploadedImage.url,
      });
      await server.process(dishCategoryCreatedAction(created));
    },
  });

  server.type(dishCategoryCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISH_CATEGORIES;
    },
  });

  server.type(updateDishCategoryAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      let uploadedImage = null;
      try {
        uploadedImage = await uploadImage(action.payload.imageBase64);
      } catch (e) {
        logError(e);
        await server.undo(action, meta, IMAGE_UPLOAD_FAIL);
        return;
      }

      const updated = await db.updateDishCategory({
        ...action.payload,
        imageUrl: uploadedImage.url,
      });
      await server.process(dishCategoryUpdatedAction(updated));
    },
  });

  server.type(dishCategoryUpdatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISH_CATEGORIES;
    },
  });

  server.type(deleteDishCategoryAction, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      await db.deleteDishCategory(id);
      await server.process(
        dishCategoryDeletedAction({
          id,
        })
      );
    },
  });

  server.type(dishCategoryDeletedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISH_CATEGORIES;
    },
  });
}
