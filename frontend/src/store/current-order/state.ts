import { ICurrentOrder } from "donut-shared";
import { IOrder } from "donut-shared/src/actions/orders";
import { getCurrentOrderFromStorage } from "../../lib/local-storage";

export interface ICurrentOrderState {
  order: ICurrentOrder | null;
  previous?: IOrder;
}

export const makeEmptyOrder = (): ICurrentOrder => ({
  comment: "",
  table: null,
  clientId: "",
  dishes: [],
});
const fromStorage = getCurrentOrderFromStorage();

const state: ICurrentOrderState = {
  order: fromStorage,
};

export default state;
