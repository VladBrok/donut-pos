import { OrderStatus } from "src/constants/order-statuses.js";
import { OrderType } from "src/constants/order-types.js";
import { createAction } from "./index.js";

export interface ICashPaymentRequest {
  id: string;
  totalCost: number;
  comment: string;
  table: {
    id: string;
    number: string;
  };
  requestedAt: string;
  orderNumber: string;
  status: OrderStatus;
  createdDate: string;
  cookingDate: string;
  cookedDate: string;
  deliveringDate: string;
  orderType: OrderType;
  deliveredDate: string;
  paidDate: string;
  employeeId: string;
  employeeEmail: string;
  clientId: string;
}

export const loadCashPaymentRequestsAction = createAction(
  "cashPaymentRequests/load"
);

export const cashPaymentRequestsLoadedAction = createAction<{
  requests: ICashPaymentRequest[];
}>("cashPaymentRequests/loaded");

export const requestCashPaymentAction = createAction<{
  orderId: string;
}>("cashPaymentRequests/request");

export const cashPaymentRequestedAction = createAction<{
  request: ICashPaymentRequest;
}>("cashPaymentRequests/requested");

export const deleteCashPaymentRequestAction = createAction<{
  id: string;
}>("cashPaymentRequests/deleteRequest");

export const cashPaymentRequestDeletedAction = createAction<{
  id: string;
  employeeId: string;
}>("cashPaymentRequests/requestDeleted");
