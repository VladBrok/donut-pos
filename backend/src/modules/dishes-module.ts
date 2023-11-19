import { Server } from "@logux/server";
import { IMAGE_UPLOAD_FAIL } from "donut-shared";
import {
  createDishAction,
  deleteDishAction,
  dishCreatedAction,
  dishDeletedAction,
  dishUpdatedAction,
  loadDishesAction,
  updateDishAction,
} from "donut-shared/src/actions.js";
import { CHANNELS } from "donut-shared/src/constants.js";
import { logError } from "donut-shared/src/log.js";
import * as db from "../lib/db/index.js";
import { DishModel } from "../lib/db/models.js";
import { uploadImage } from "../lib/images.js";
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

  server.type(createDishAction, {
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

      const created = await db.createDish({
        ...action.payload,
        imageUrl: uploadedImage.url,
      });
      await server.process(dishCreatedAction(created));
    },
  });

  server.type(dishCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISHES;
    },
  });

  server.type(updateDishAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
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

      const toUpdate: Partial<DishModel> & { imageBase64?: string } = {
        ...action.payload,
        ...(uploadedImage && { imageUrl: uploadedImage.url }),
      };
      delete toUpdate.imageBase64;
      const updated = await db.updateDish(toUpdate);
      await server.process(dishUpdatedAction(updated));
    },
  });

  server.type(dishUpdatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.DISHES;
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
