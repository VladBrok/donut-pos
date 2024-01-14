import { IDishInOrder } from "donut-shared/src/actions/orders";

export function getUniqueDishId(dish: IDishInOrder) {
  return (
    dish.id + dish.modifications.map((x) => `${x.id}_${x.count}`).join(",")
  );
}
