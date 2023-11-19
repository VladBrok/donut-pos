import {
  dish,
  dishCategory,
  employee,
  role,
} from "../../../migrations/schema.js";

export type SelectEmployeeSchema = {
  [employee._.name]: typeof employee.$inferSelect;
  [role._.name]: typeof role.$inferSelect | null;
};

export type DishCategorySchema = typeof dishCategory.$inferSelect;

export type DishSchema = {
  [dish._.name]: typeof dish.$inferSelect;
  [dishCategory._.name]: typeof dishCategory.$inferSelect | null;
};
