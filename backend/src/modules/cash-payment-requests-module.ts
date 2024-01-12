import { Server } from "@logux/server";
import {
  CHANNELS,
  cashPaymentRequestedAction,
  cashPaymentRequestsLoadedAction,
  requestCashPaymentAction,
} from "donut-shared";
import {
  cashPaymentRequestDeletedAction,
  deleteCashPaymentRequestAction,
} from "donut-shared/src/actions/cash-payment-requests.js";
import * as db from "../db/modules/cash-payment-requests.js";
import { hasWaiterPermission } from "../lib/access.js";

export default function cashPaymentRequestsModule(server: Server) {
  server.channel<{
    employeeId: string;
  }>(CHANNELS.CASH_PAYMENT_REQUESTS_OF_EMPLOYEE(), {
    async access(ctx) {
      return await hasWaiterPermission(ctx.userId);
    },
    async load(ctx) {
      const requests = await db.getCashPaymentRequests(ctx.userId);
      return cashPaymentRequestsLoadedAction({
        requests: requests,
      });
    },
  });

  server.type(requestCashPaymentAction, {
    async access(ctx) {
      return true;
    },
    async process(ctx, action, meta) {
      const request = await db.requestCashPayment(action.payload.orderId);
      await server.process(
        cashPaymentRequestedAction({
          request: request,
        })
      );
    },
  });

  server.type(cashPaymentRequestedAction, {
    async access() {
      return false;
    },
    async process(ctx, action) {
      // TODO: send notifications
      // await sendEmailNotification("@gmail.com", `dish was cooked`);
    },
    resend(ctx, action) {
      return [
        CHANNELS.CASH_PAYMENT_REQUESTS_OF_EMPLOYEE(
          action.payload.request.employeeId
        ),
      ];
    },
  });

  server.type(deleteCashPaymentRequestAction, {
    async access(ctx) {
      return true;
    },
    async process(ctx, action, meta) {
      const result = await db.deleteCashPaymentRequest(action.payload.id);
      await server.process(
        cashPaymentRequestDeletedAction({
          id: action.payload.id,
          employeeId: result.employeeId,
        })
      );
    },
  });

  server.type(cashPaymentRequestDeletedAction, {
    async access() {
      return false;
    },
    async process(ctx, action) {},
    resend(ctx, action) {
      return [
        CHANNELS.CASH_PAYMENT_REQUESTS_OF_EMPLOYEE(action.payload.employeeId),
      ];
    },
  });
}
