import { Action, Server, ServerMeta } from "@logux/server";
import {
  IMAGE_UPLOAD_FAIL,
  createModificationAction,
  deleteModificationAction,
  loadModificationsAction,
  modificationCreatedAction,
  modificationDeletedAction,
  modificationUpdatedAction,
  updateModificationAction,
} from "donut-shared";
import {
  CHANNELS,
  MODIFICATION_NAME_EXISTS,
} from "donut-shared/src/constants.js";
import { logError } from "donut-shared/src/lib/log.js";
import { ModificationModel } from "../lib/db/models.js";
import * as db from "../lib/db/modules/modifications.js";
import { uploadImage } from "../lib/images.js";
import { hasAdminPermission } from "../lib/permissions.js";

export default function modificationsModule(server: Server) {
  server.channel(CHANNELS.MODIFICATIONS, {
    access() {
      return true;
    },
    async load() {
      const modifications = await db.getAllModifications();
      return loadModificationsAction({ modifications });
    },
  });

  server.type(createModificationAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (
        !(await validateModificationName(
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

      const created = await db.createModification({
        ...action.payload,
        imageUrl: uploadedImage.url,
      });
      await server.process(modificationCreatedAction(created));
    },
  });

  server.type(modificationCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.MODIFICATIONS;
    },
  });

  server.type(updateModificationAction, {
    async access(ctx) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      if (
        !(await validateModificationName(
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

      const toUpdate: Partial<ModificationModel> & {
        imageBase64?: string;
      } = {
        ...action.payload,
        ...(uploadedImage && { imageUrl: uploadedImage.url }),
      };
      delete toUpdate.imageBase64;
      await db.updateModification(toUpdate);
      await server.process(modificationUpdatedAction(toUpdate));
    },
  });

  server.type(modificationUpdatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.MODIFICATIONS;
    },
  });

  server.type(deleteModificationAction, {
    async access(ctx, action, meta) {
      return await hasAdminPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      await db.deleteModification(id);
      await server.process(
        modificationDeletedAction({
          id,
        })
      );
    },
  });

  server.type(modificationDeletedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.MODIFICATIONS;
    },
  });
}

async function validateModificationName(
  server: Server,
  action: Action,
  meta: ServerMeta,
  name?: string
) {
  if (!name) {
    return true;
  }

  const existing = await db.getModificationByName(name);

  if (existing) {
    server.undo(action, meta, MODIFICATION_NAME_EXISTS);
    return false;
  }

  return true;
}
