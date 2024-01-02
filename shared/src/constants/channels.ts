export const CHANNELS = {
  DISH_CATEGORIES: "dishCategories",
  DISHES: "dishes",
  MODIFICATIONS: "modifications",
  EMPLOYEES: "employees",
  ROLES: "roles",
  ORDERS_OF_EMPLOYEE: (id = ":employeeId") => `orders/${id}`,
  ORDERS_OF_CLIENT: (id = ":clientId") => `ordersClient/${id}`,
  COOKED_DISHES_OF_EMPLOYEE: (id = ":employeeId") => `cookedDishes/${id}`,
  ORDER_SINGLE: (id = ":orderNumber") => `singleOrder/${id}`,
  ORDERS_FOR_KITCHEN: "ordersForKitchen",
  DINING_TABLES: "diningTables",
};
