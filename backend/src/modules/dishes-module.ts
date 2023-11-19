import { Server } from "@logux/server";
import { loadDishesAction } from "donut-shared/src/actions.js";
import { CHANNELS } from "donut-shared/src/constants.js";
import * as db from "../lib/db/index.js";

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
}
