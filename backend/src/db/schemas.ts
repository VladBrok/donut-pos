import {
  address,
  cashPaymentRequest,
  client,
  diningTable,
  dish,
  dishCategory,
  dishToModification,
  employee,
  modification,
  order,
  orderToDishes,
  permission,
  role,
  roleToPermission,
  salePoint,
} from "migrations/schema.js";

export type EmployeeSchema = {
  [employee._.name]: typeof employee.$inferSelect;
  [role._.name]: typeof role.$inferSelect | null;
  [permission._.name]: typeof permission.$inferSelect | null;
  [roleToPermission._.name]: typeof roleToPermission.$inferSelect | null;
};

export type DishCategorySchema = typeof dishCategory.$inferSelect;

export type DiningTableSchema = {
  [diningTable._.name]: typeof diningTable.$inferSelect;
  [employee._.name]: typeof employee.$inferSelect | null;
};

export type AddressSchema = {
  [address._.name]: typeof address.$inferSelect;
};

export type DishSchema = {
  [dish._.name]: typeof dish.$inferSelect;
  [dishCategory._.name]: typeof dishCategory.$inferSelect | null;
  [modification._.name]: typeof modification.$inferSelect | null;
  [dishToModification._.name]: typeof dishToModification.$inferSelect | null;
};

export type ModificationSchema = typeof modification.$inferSelect;

export type RoleSchema = typeof role.$inferSelect;

export type OrderSchema = {
  [order._.name]: typeof order.$inferSelect;
  [orderToDishes._.name]: typeof orderToDishes.$inferSelect | null;
  [diningTable._.name]: typeof diningTable.$inferSelect | null;
  diningTableEmployee: typeof employee.$inferSelect | null;
  [employee._.name]: typeof employee.$inferSelect | null;
  [client._.name]: typeof client.$inferSelect | null;
};

export type ShallowOrderSchema = {
  [order._.name]: typeof order.$inferSelect;
  [diningTable._.name]: typeof diningTable.$inferSelect | null;
  diningTableEmployee: typeof employee.$inferSelect | null;
  [employee._.name]: typeof employee.$inferSelect | null;
  [client._.name]: typeof client.$inferSelect | null;
};

export type DishInOrderSchema = {
  [order._.name]: typeof order.$inferSelect;
  [diningTable._.name]: typeof diningTable.$inferSelect | null;
  diningTableEmployee: typeof employee.$inferSelect | null;
  [orderToDishes._.name]: typeof orderToDishes.$inferSelect | null;
  [employee._.name]: typeof employee.$inferSelect | null;
  [client._.name]: typeof client.$inferSelect | null;
};

export type ClientSchema = {
  [client._.name]: typeof client.$inferSelect;
};

export type CashPaymentRequestSchema = {
  [cashPaymentRequest._.name]: typeof cashPaymentRequest.$inferSelect;
  [order._.name]: typeof order.$inferSelect | null;
  [diningTable._.name]: typeof diningTable.$inferSelect | null;
};

export type SalePointSchema = {
  [salePoint._.name]: typeof salePoint.$inferSelect;
  [address._.name]: typeof address.$inferSelect | null;
};
