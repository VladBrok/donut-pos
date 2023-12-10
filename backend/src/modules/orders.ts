import { Server } from "@logux/server";
import { createOrderAction, orderCreatedAction } from "donut-shared";
import { CHANNELS } from "donut-shared/src/constants.js";
import * as db from "../db/modules/orders.js";
import { hasWaiterPermission } from "../lib/access.js";

export default function ordersModule(server: Server) {
  server.channel(CHANNELS.ORDERS, {
    access(ctx) {
      return hasWaiterPermission(ctx.userId); // TODO: cooks and clients should aslo be notified
    },
    async load() {
      // TODO: return orders created by this employee
      // const dishes = await db.getAllDishes();
      // return loadDishesAction({ dishes });
    },
  });

  server.type(createOrderAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const created = await db.createOrder(action.payload.order);
      await server.process(orderCreatedAction()); // TODO: send created order
    },
  });

  server.type(orderCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.ORDERS;
    },
  });
}
