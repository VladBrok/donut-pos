interface IDish {
  price: number;
  count: number;
  modifications: { price: number; count: number }[];
}

export function getOrderDishTotalCost(dish: IDish): number {
  return (
    (dish.price +
      dish.modifications.reduce((sum, cur) => sum + cur.price * cur.count, 0)) *
    dish.count
  );
}

export function getOrderTotalCost(dishes: IDish[]): number {
  return dishes.reduce((sum, cur) => sum + getOrderDishTotalCost(cur), 0) || 0;
}
