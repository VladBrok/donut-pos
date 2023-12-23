import { Server } from "@logux/server";
import { createOrderAction, orderCreatedAction } from "donut-shared";
import {
  createdOrdersLoadedAction,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  finishCookingDishAction,
  loadOrdersPageAction,
  orderLoadedAction,
  ordersPageLoadedAction,
  startCookingDishAction,
} from "donut-shared/src/actions/orders.js";
import { CHANNELS, ITEMS_PER_PAGE } from "donut-shared/src/constants.js";
import * as db from "../db/modules/orders.js";
import { hasCookPermissions, hasWaiterPermission } from "../lib/access.js";

// TODO: consider creating separate channels for client's orders ?

export default function ordersModule(server: Server) {
  server.channel(CHANNELS.CREATED_ORDERS, {
    access(ctx) {
      return hasCookPermissions(ctx.userId);
    },
    async load() {
      const orders = await db.getCreatedOrders();
      return createdOrdersLoadedAction({
        createdOrders: orders,
      });
    },
  });

  // TODO: maybe remove this channel?
  server.channel(CHANNELS.ORDERS, {
    access(ctx) {
      return hasWaiterPermission(ctx.userId);
    },
    async load() {},
  });

  // TODO: resend order updates via this channel so that the client can see live changes
  server.channel<{
    orderNumber: string;
  }>(CHANNELS.ORDER_SINGLE, {
    async access(ctx, action, meta) {
      return true;
    },
    async load(ctx, action, meta) {
      const order = await db.getSingleOrder(ctx.params.orderNumber, ctx.userId);
      return orderLoadedAction({
        order: order,
      });
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
      const { ordersPage, total } = await db.getOrdersPage({
        page: 1,
        employeeId: ctx.userId,
        perPage: ITEMS_PER_PAGE,
        status: "created",
      });
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
      const { ordersPage, total } = await db.getOrdersPage({
        page: action.payload.page,
        perPage: ITEMS_PER_PAGE,
        employeeId: ctx.userId,
        status: action.payload.status,
        orderNumber: action.payload.orderNumber,
      });
      await ctx.sendBack(
        ordersPageLoadedAction({
          ordersPage: ordersPage,
          totalOrders: total,
        })
      );
    },
  });

  server.type(startCookingDishAction, {
    async access(ctx) {
      return await hasCookPermissions(ctx.userId);
    },
    async process(ctx, action, meta) {
      await db.startCookingDish(
        action.payload.orderId,
        action.payload.dishIdInOrder
      );
      await server.process(dishStartedCookingAction(action.payload));
    },
  });

  server.type(dishStartedCookingAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.CREATED_ORDERS;
    },
  });

  server.type(finishCookingDishAction, {
    async access(ctx) {
      return await hasCookPermissions(ctx.userId);
    },
    async process(ctx, action, meta) {
      await db.finishCookingDish(action.payload.dishIdInOrder);
      await server.process(dishFinishedCookingAction(action.payload));
    },
  });

  server.type(dishFinishedCookingAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.CREATED_ORDERS;
    },
  });

  server.type(createOrderAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const created = await db.createOrder(action.payload.order, ctx.userId);
      await server.process(
        orderCreatedAction({
          order: created,
        })
      );
    },
  });

  server.type(orderCreatedAction, {
    async access() {
      return false;
    },
    resend() {
      return CHANNELS.CREATED_ORDERS;
    },
  });
}
