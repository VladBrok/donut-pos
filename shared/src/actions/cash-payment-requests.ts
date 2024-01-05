import { OrderStatus } from "src/constants/order-statuses.js";
import { createAction } from "./index.js";

export interface ICashPaymentRequest {
  id: string;
  totalCost: number;
  comment: string;
  table: {
    id: string;
    number: string;
  };
  orderNumber: string;
  status: OrderStatus;
  createdDate: string;
  cookingDate: string;
  cookedDate: string;
  deliveringDate: string;
  deliveredDate: string;
  paidDate: string;
  employeeId: string;
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
