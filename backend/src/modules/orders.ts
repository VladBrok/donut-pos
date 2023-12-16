import { Server } from "@logux/server";
import { createOrderAction, orderCreatedAction } from "donut-shared";
import {
  loadOrdersPageAction,
  ordersPageLoadedAction,
} from "donut-shared/src/actions/orders.js";
import { CHANNELS, ITEMS_PER_PAGE } from "donut-shared/src/constants.js";
import * as db from "../db/modules/orders.js";
import { hasWaiterPermission } from "../lib/access.js";

// TODO: consider creating separate channels for client's orders ?

export default function ordersModule(server: Server) {
  // TODO: no one is currently listening this channel. But it sends resends `orderCreatedAction`
  server.channel(CHANNELS.ORDERS, {
    access(ctx) {
      return hasWaiterPermission(ctx.userId); // TODO: cooks and clients should aslo be notified
    },
    async load() {
      // TODO: return orders created by this employee ?
      // const dishes = await db.getAllDishes();
      // return loadDishesAction({ dishes });
    },
  });

  server.channel<{
    employeeId: string;
  }>(CHANNELS.ORDERS_OF_EMPLOYEE, {
    async access(ctx, action, meta) {
      return (
        ctx.userId === ctx.params.employeeId &&
        (await hasWaiterPermission(ctx.userId))
      );
    },
    async load(ctx, action, meta) {
      const { ordersPage, total } = await db.getOrdersPage(
        1,
        ITEMS_PER_PAGE,
        ctx.userId
      );
      return ordersPageLoadedAction({
        ordersPage: ordersPage,
        totalOrders: total,
      });
    },
  });

  server.type(loadOrdersPageAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const { ordersPage, total } = await db.getOrdersPage(
        action.payload.page,
        ITEMS_PER_PAGE,
        ctx.userId,
        action.payload.status
      );
      await ctx.sendBack(
        ordersPageLoadedAction({
          ordersPage: ordersPage,
          totalOrders: total,
        })
      );
    },
  });

  server.type(createOrderAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const created = await db.createOrder(action.payload.order, ctx.userId);
      await server.process(orderCreatedAction()); // TODO: send created order ?
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
