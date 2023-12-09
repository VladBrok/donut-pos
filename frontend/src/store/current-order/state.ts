import { ICurrentOrder } from "donut-shared";
import { getCurrentOrderFromStorage } from "../../lib/local-storage";

export interface ICurrentOrderState {
  order: ICurrentOrder | null;
}

export const makeEmptyOrder = () => ({
  comment: "",
  tableNumber: "",
  clientId: "",
  dishes: [],
});
const fromStorage = getCurrentOrderFromStorage();

const state: ICurrentOrderState = {
  order: fromStorage,
};

export default state;
