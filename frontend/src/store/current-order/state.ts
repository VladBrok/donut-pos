import { ORDER_TYPES } from "donut-shared";
import { IOrder } from "donut-shared/src/actions/orders";
import { generateRandomId } from "src/lib/generate-random-id";
import { getCurrentOrderFromStorage } from "../../lib/local-storage";

export interface ICurrentOrderState {
  order: IOrder | null;
  previous?: IOrder;
}

export const makeEmptyOrder = (): IOrder => ({
  id: generateRandomId(),
  comment: "",
  cookedDate: "",
  cookingDate: "",
  createdDate: "",
  deliveredDate: "",
  deliveringDate: "",
  paidDate: "",
  dishes: [],
  employee: null,
  client: null,
  orderNumber: "",
  status: "",
  table: null,
  type: ORDER_TYPES.DINE_IN,
});
const fromStorage = getCurrentOrderFromStorage();

const state: ICurrentOrderState = {
  order: fromStorage,
};

export default state;
