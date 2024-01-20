import { Server } from "@logux/server";
import { CHANNELS } from "donut-shared";
import { addressesLoadedAction } from "donut-shared/src/actions/addresses.js";
import * as db from "../db/modules/addresses.js";

export default function addressesModule(server: Server) {
  server.channel(CHANNELS.ADDRESSES, {
    access(ctx) {
      return Boolean(ctx.userId);
    },
    async load(ctx) {
      const addresses = await db.getAllAdddresses(ctx.userId);
      return addressesLoadedAction({ addresses });
    },
  });
}
