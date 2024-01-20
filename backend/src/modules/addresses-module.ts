import { Server } from "@logux/server";
import { CHANNELS } from "donut-shared";
import {
  addressCreatedAction,
  addressDeletedAction,
  addressesLoadedAction,
  createAddressAction,
  deleteAddressAction,
} from "donut-shared/src/actions/addresses.js";
import * as db from "../db/modules/addresses.js";

export default function addressesModule(server: Server) {
  server.channel<{
    clientId: string;
  }>(CHANNELS.ADDRESSES_OF_CLIENT(), {
    access(ctx) {
      return ctx.userId === ctx.params.clientId;
    },
    async load(ctx, action, meta) {
      const addresses = await db.getAllAdddresses(ctx.params.clientId);
      return addressesLoadedAction({ addresses });
    },
  });

  server.type(createAddressAction, {
    async access(ctx) {
      return Boolean(ctx.userId);
    },
    async process(ctx, action, meta) {
      const address = action.payload.address;
      if (!address.clientId) {
        address.clientId = ctx.userId;
      }
      const created = await db.createAddress(address);
      await server.process(
        addressCreatedAction({
          address: created,
        })
      );
    },
  });

  server.type(addressCreatedAction, {
    async access() {
      return false;
    },
    resend(ctx, action) {
      return action.payload.address.clientId
        ? [CHANNELS.ADDRESSES_OF_CLIENT(action.payload.address.clientId)]
        : [];
    },
  });

  server.type(deleteAddressAction, {
    async access(ctx, action, meta) {
      return Boolean(ctx.userId);
    },
    async process(ctx, action, meta) {
      const id = action.payload.id;
      await db.deleteAddress(id);
      await server.process(
        addressDeletedAction({
          id,
          clientId: ctx.userId,
        })
      );
    },
  });

  server.type(addressDeletedAction, {
    async access() {
      return false;
    },
    resend(ctx, action) {
      return [CHANNELS.ADDRESSES_OF_CLIENT(action.payload.clientId)];
    },
  });
}
