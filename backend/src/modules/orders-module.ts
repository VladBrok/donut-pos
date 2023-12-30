import { Server } from "@logux/server";
import {
  CHANNELS,
  ITEMS_PER_PAGE,
  PAYMENT_LINK_GENERATION_ERROR,
  createOrderAction,
  orderCreatedAction,
} from "donut-shared";
import {
  cookedDishesLoadedAction,
  dishDeliveredAction,
  dishFinishedCookingAction,
  dishStartedCookingAction,
  finishCookingDishAction,
  getPaymentLinkAction,
  loadOrdersPageAction,
  orderLoadedAction,
  orderPaidSuccessAction,
  ordersForKitchenLoadedAction,
  ordersPageLoadedAction,
  payForOrderAction,
  paymentLinkReceivedAction,
  startCookingDishAction,
  startDeliveredDishAction,
} from "donut-shared/src/actions/orders.js";
import { logError } from "donut-shared/src/lib/log.js";
import Stripe from "stripe";
import * as db from "../db/modules/orders.js";
import { hasCookPermissions, hasWaiterPermission } from "../lib/access.js";

// TODO: split this module (here, in db, on client, in actions)

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
  }>(CHANNELS.ORDER_SINGLE(), {
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
  }>(CHANNELS.COOKED_DISHES_OF_EMPLOYEE(), {
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
        search: action.payload.search,
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
        CHANNELS.ORDER_SINGLE(action.payload.orderNumber),
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

  server.type(dishFinishedCookingAction, {
    async access() {
      return false;
    },
    resend(ctx, action) {
      return [
        CHANNELS.ORDERS_FOR_KITCHEN,
        CHANNELS.COOKED_DISHES_OF_EMPLOYEE(
          action.payload.cookedDish.order.employee?.id
        ),
        CHANNELS.ORDER_SINGLE(action.payload.cookedDish.order.orderNumber),
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
        CHANNELS.COOKED_DISHES_OF_EMPLOYEE(action.payload.order.employee?.id),
        CHANNELS.ORDER_SINGLE(action.payload.order.orderNumber),
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

  server.type(payForOrderAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const order = await db.payForOrder(action.payload.orderNumber);
      await server.process(
        orderPaidSuccessAction({
          order: order,
        })
      );
    },
  });

  server.type(orderPaidSuccessAction, {
    async access() {
      return false;
    },
    resend(ctx, action) {
      return [
        CHANNELS.ORDER_SINGLE(action.payload.order.orderNumber),
        CHANNELS.ORDERS_OF_EMPLOYEE(action.payload.order.employee?.id),
      ];
    },
  });

  server.type(getPaymentLinkAction, {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async process(ctx, action, meta) {
      const order = await db.getSingleOrder(action.payload.orderNumber);
      let session: Stripe.Response<Stripe.Checkout.Session> | null = null;

      try {
        const stripe = new Stripe(process.env.STRIPE_KEY || "");
        session = await stripe.checkout.sessions.create({
          line_items: order.dishes.flatMap((dish) => {
            return [
              {
                price_data: {
                  currency: "pln",
                  product_data: {
                    name: dish.name,
                  },
                  unit_amount: dish.price,
                },
                quantity: dish.count,
              },
              ...dish.modifications.map((modification) => ({
                price_data: {
                  currency: "pln",
                  product_data: {
                    name: modification.name,
                  },
                  unit_amount: modification.price,
                },
                quantity: modification.count * dish.count,
              })),
            ];
          }),
          mode: "payment",
          payment_method_types: [action.payload.method],
          success_url: `${process.env.CLIENT_URL}/payment-success`,
          cancel_url: `${process.env.CLIENT_URL}/payment-error`,
          payment_intent_data: {
            metadata: {
              orderNumber: action.payload.orderNumber,
            },
          },
        });
      } catch (err) {
        logError("Stripe checkout error:", err);
        await server.undo(action, meta, PAYMENT_LINK_GENERATION_ERROR);
      }

      await ctx.sendBack(
        paymentLinkReceivedAction({
          link: session?.url || "",
        })
      );
    },
  });

  server.http(async (req, res) => {
    const isStripeWebhook = req.url === "/webhook" && req.method === "POST";
    if (!isStripeWebhook) {
      res.end("not found");
      return;
    }

    const end = (code = 200) => {
      res.writeHead(code, { "Content-Type": "application/json" });
      if (code === 200) {
        res.end(JSON.stringify({ received: true }));
      } else {
        res.end(JSON.stringify({ error: "Webhook error" }));
      }
    };

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("error", () => {
      end(400);
    });
    req.on("end", async () => {
      const stripe = new Stripe(process.env.STRIPE_KEY || "");

      const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET || "";
      const sig = req.headers["stripe-signature"] || "";
      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      } catch (err) {
        end(400);
        return;
      }

      switch (event.type) {
        case "payment_intent.succeeded":
          server.process(
            payForOrderAction({
              orderNumber: event.data.object.metadata.orderNumber,
            })
          );
          break;
      }

      end();
    });
  });
}
