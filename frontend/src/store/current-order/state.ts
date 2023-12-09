import { ICurrentOrder } from "donut-shared";
import { getCurrentOrderFromStorage } from "../../lib/local-storage";

export interface ICurrentOrderState {
  order: ICurrentOrder;
}

const makeEmptyOrder = () => ({
  comment: "",
  tableNumber: "",
  clientId: "",
  dishes: [],
});
const fromStorage = getCurrentOrderFromStorage();

const state: ICurrentOrderState = {
  order: fromStorage || makeEmptyOrder(),
};

export default state;
