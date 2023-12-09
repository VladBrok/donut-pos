import { ICurrentOrder } from "donut-shared";

export interface ICurrentOrderState {
  order: ICurrentOrder;
}

const state: ICurrentOrderState = {
  order: {
    comment: "",
    tableNumber: "",
    clientId: "",
    dishes: [],
  },
};

export default state;
