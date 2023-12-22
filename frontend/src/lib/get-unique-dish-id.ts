import { ICurrentOrderDishPayload } from "donut-shared/src/actions/current-order";

export function getUniqueDishId(dish: ICurrentOrderDishPayload) {
  return (
    dish.id + dish.modifications.map((x) => `${x.id}_${x.count}`).join(",")
  );
}
