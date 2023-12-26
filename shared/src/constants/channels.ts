export const CHANNELS = {
  DISH_CATEGORIES: "dishCategories",
  DISHES: "dishes",
  MODIFICATIONS: "modifications",
  EMPLOYEES: "employees",
  ROLES: "roles",
  ORDERS_OF_EMPLOYEE: (id = ":employeeId") => `orders/${id}`,
  COOKED_DISHES_OF_EMPLOYEE: (id = ":employeeId") => `cookedDishes/${id}`,
  ORDER_SINGLE: "singleOrder/:orderNumber",
  ORDERS_FOR_KITCHEN: "ordersForKitchen",
};
