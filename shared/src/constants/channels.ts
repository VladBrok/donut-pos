export const CHANNELS = {
  DISH_CATEGORIES: "dishCategories",
  DISHES: "dishes",
  MODIFICATIONS: "modifications",
  EMPLOYEES: "employees",
  ROLES: "roles",
  CLIENTS: "clients",
  ORDERS_OF_EMPLOYEE: (id = ":employeeId") => `orders/${id}`,
  ORDERS_OF_CLIENT: (id = ":clientId") => `ordersClient/${id}`,
  COOKED_DISHES_OF_EMPLOYEE: (id = ":employeeId") => `cookedDishes/${id}`,
  COOKED_ORDERS_OF_CLIENT: (id = ":clientId") => `cookedOrders/${id}`,
  CASH_PAYMENT_REQUESTS_OF_EMPLOYEE: (id = ":employeeId") =>
    `cashPaymentRequests/${id}`,
  ORDER_SINGLE: (id = ":orderNumber") => `singleOrder/${id}`,
  ORDERS_FOR_KITCHEN: "ordersForKitchen",
  DINING_TABLES: "diningTables",
  ADDRESSES: "addresses",
};
