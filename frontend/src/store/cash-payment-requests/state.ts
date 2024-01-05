import { ICashPaymentRequest } from "donut-shared";

export interface ICashPaymentRequestsState {
  requests: ICashPaymentRequest[];
}

const state: ICashPaymentRequestsState = {
  requests: [],
};

export default state;
