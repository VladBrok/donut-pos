import dayjs from "dayjs";
import { OrderStatus } from "donut-shared/src/constants";
import { IOrdersState } from "src/store/orders/state";

export function getOrderCurrentStatus(
  order: IOrdersState["ordersPage"][number]
): OrderStatus {
  return order.statuses
    .slice()
    .sort((a, b) => dayjs.utc(a.date).unix() - dayjs.utc(b.date).unix())
    .at(-1)?.codeName;
}
