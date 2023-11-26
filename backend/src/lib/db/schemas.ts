import {
  dish,
  dishCategory,
  employee,
  modification,
  permission,
  role,
  roleToPermission,
} from "../../../migrations/schema.js";

export type SelectEmployeeSchema = {
  [employee._.name]: typeof employee.$inferSelect;
  [role._.name]: typeof role.$inferSelect | null;
  [permission._.name]: typeof permission.$inferSelect | null;
  [roleToPermission._.name]: typeof roleToPermission.$inferSelect | null;
};

export type DishCategorySchema = typeof dishCategory.$inferSelect;

export type DishSchema = {
  [dish._.name]: typeof dish.$inferSelect;
  [dishCategory._.name]: typeof dishCategory.$inferSelect | null;
};

export type ModificationSchema = typeof modification.$inferSelect;
