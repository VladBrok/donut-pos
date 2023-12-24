import {
  client,
  dish,
  dishCategory,
  dishToModification,
  employee,
  modification,
  order,
  orderToDish,
  orderToDishToModification,
  orderToOrderStatus,
  permission,
  role,
  roleToPermission,
} from "migrations/schema.js";

export type EmployeeSchema = {
  [employee._.name]: typeof employee.$inferSelect;
  [role._.name]: typeof role.$inferSelect | null;
  [permission._.name]: typeof permission.$inferSelect | null;
  [roleToPermission._.name]: typeof roleToPermission.$inferSelect | null;
};

export type DishCategorySchema = typeof dishCategory.$inferSelect;

export type DishSchema = {
  [dish._.name]: typeof dish.$inferSelect;
  [dishCategory._.name]: typeof dishCategory.$inferSelect | null;
  [modification._.name]: typeof modification.$inferSelect | null;
  [dishToModification._.name]: typeof dishToModification.$inferSelect | null;
};

export type ModificationSchema = typeof modification.$inferSelect;

export type RoleSchema = typeof role.$inferSelect;

export type OrderSchema = {
  order: {
    [order._.name]: typeof order.$inferSelect;
  };
  [employee._.name]: typeof employee.$inferSelect | null;
  [client._.name]: typeof client.$inferSelect | null;
  [dish._.name]: typeof dish.$inferSelect | null;
  [orderToOrderStatus._.name]: typeof orderToOrderStatus.$inferSelect | null;
  [orderToDish._.name]: typeof orderToDish.$inferSelect | null;
  [orderToDishToModification._.name]:
    | typeof orderToDishToModification.$inferSelect
    | null;
  [modification._.name]: typeof modification.$inferSelect | null;
};

export type ShallowOrderSchema = {
  [order._.name]: typeof order.$inferSelect;
  [employee._.name]: typeof employee.$inferSelect | null;
  [client._.name]: typeof client.$inferSelect | null;
};
