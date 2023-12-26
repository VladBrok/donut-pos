import { Server } from "@logux/server";
import {
  CHANNELS,
  ITEMS_PER_PAGE,
  createOrderAction,
  orderCreatedAction,
} from "donut-shared";
import {
  cookedDishesLoadedAction,
  dishDeliveredAction,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  finishCookingDishAction,
  loadOrdersPageAction,
  orderLoadedAction,
  ordersForKitchenLoadedAction,
  ordersPageLoadedAction,
  startCookingDishAction,
  startDeliveredDishAction,
} from "donut-shared/src/actions/orders.js";
import * as db from "../db/modules/orders.js";
import { hasCookPermissions, hasWaiterPermission } from "../lib/access.js";

// TODO: consider creating separate channels for client's orders ?

export default function ordersModule(server: Server) {
  server.channel(CHANNELS.ORDERS_FOR_KITCHEN, {
    access(ctx) {
      return hasCookPermissions(ctx.userId);
    },
    async load() {
      const orders = await db.getOrdersForKitchen();
      return ordersForKitchenLoadedAction({
        orders: orders,
      });
    },
  });

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
  }>(CHANNELS.COOKED_DISHES_OF_EMPLOYEE, {
    async access(ctx, action, meta) {
      return (
        ctx.userId === ctx.params.employeeId &&
        (await hasWaiterPermission(ctx.userId))
      );
    },
    async load(ctx, action, meta) {
      const dishes = await db.getCookedDishes(ctx.userId);
      return cookedDishesLoadedAction({
        dishes: dishes,
      });
    },
  });

  server.channel<{
    employeeId: string;
  }>(CHANNELS.ORDERS_OF_EMPLOYEE(), {
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
        statuses: ["created"],
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
        statuses: action.payload.status ? [action.payload.status] : undefined,
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
    resend(ctx, action) {
      return [
        CHANNELS.ORDERS_FOR_KITCHEN,
        `singleOrder/${action.payload.orderNumber}`,
        CHANNELS.ORDERS_OF_EMPLOYEE(action.payload.employeeId),
      ];
    },
  });

  server.type(finishCookingDishAction, {
    async access(ctx) {
      return await hasCookPermissions(ctx.userId);
    },
    async process(ctx, action, meta) {
      const result = await db.finishCookingDish(
        action.payload.orderId,
        action.payload.dishIdInOrder
      );
      await server.process(
        dishFinishedCookingAction({
          cookedDish: result,
        })
      );
    },
  });

  // TODO: find a way to use constants for channels such as "cookedDishes/:employeeId"
  server.type(dishFinishedCookingAction, {
    async access() {
      return false;
    },
    resend(ctx, action) {
      return [
        CHANNELS.ORDERS_FOR_KITCHEN,
        `cookedDishes/${action.payload.cookedDish.order.employee?.id}`,
        `singleOrder/${action.payload.cookedDish.order.orderNumber}`,
        CHANNELS.ORDERS_OF_EMPLOYEE(
          action.payload.cookedDish.order.employee?.id
        ),
      ];
    },
  });

  server.type(startDeliveredDishAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const order = await db.deliverDish(
        action.payload.orderId,
        action.payload.dishIdInOrder
      );
      await server.process(
        dishDeliveredAction({
          order: order,
          dishIdInOrder: action.payload.dishIdInOrder,
        })
      );
    },
  });

  server.type(dishDeliveredAction, {
    async access() {
      return false;
    },
    resend(ctx, action) {
      return [
        `cookedDishes/${action.payload.order.employee?.id}`,
        `singleOrder/${action.payload.order.orderNumber}`,
        CHANNELS.ORDERS_OF_EMPLOYEE(action.payload.order.employee?.id),
      ];
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
      return CHANNELS.ORDERS_FOR_KITCHEN;
    },
  });
}
