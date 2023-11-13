import { Server } from "@logux/server";
import { CHANNELS, loadDishCategoriesAction } from "donut-shared";
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
}
