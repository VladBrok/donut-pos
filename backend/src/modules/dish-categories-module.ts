import { Action, Server, ServerMeta } from "@logux/server";
import {
  createDishCategoryAction,
  deleteDishCategoryAction,
  dishCategoryCreatedAction,
  dishCategoryDeletedAction,
  dishCategoryUpdatedAction,
  loadDishCategoriesAction,
  updateDishCategoryAction,
} from "donut-shared/src/actions/dish-categories.js";
import {
  CATEGORY_NAME_EXISTS,
  CHANNELS,
  IMAGE_UPLOAD_FAIL,
} from "donut-shared/src/constants.js";
import { logError } from "donut-shared/src/lib/log.js";
import { DishCategoryModel } from "../db/models.js";
import * as db from "../db/modules/dish-categories.js";
import { hasAdminPermission } from "../lib/access.js";
import { uploadImage } from "../lib/images.js";

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
      if (
        !(await validateDishCategoryName(
          server,
          action,
          meta,
          action.payload.name
        ))
      ) {
        return;
      }

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
      if (
        !(await validateDishCategoryName(
          server,
          action,
          meta,
          action.payload.name
        ))
      ) {
        return;
      }

      let uploadedImage = null;
      try {
        if (action.payload.imageBase64) {
          uploadedImage = await uploadImage(action.payload.imageBase64);
        }
      } catch (e) {
        logError(e);
        await server.undo(action, meta, IMAGE_UPLOAD_FAIL);
        return;
      }

      const toUpdate: Partial<DishCategoryModel> & { imageBase64?: string } = {
        ...action.payload,
        ...(uploadedImage && { imageUrl: uploadedImage.url }),
      };
      delete toUpdate.imageBase64;
      const updated = await db.updateDishCategory(toUpdate);
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

async function validateDishCategoryName(
  server: Server,
  action: Action,
  meta: ServerMeta,
  name?: string
) {
  if (!name) {
    return true;
  }

  const existing = await db.getDishCategoryByName(name);

  if (existing) {
    server.undo(action, meta, CATEGORY_NAME_EXISTS);
    return false;
  }

  return true;
}
