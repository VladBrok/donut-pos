import { DishCategoryModel, DishModel, EmployeeModel } from "./models.js";
import {
  DishCategorySchema,
  DishSchema,
  SelectEmployeeSchema,
} from "./schemas.js";

export const employeeAdapter = (
  data?: SelectEmployeeSchema | null
): EmployeeModel | null => {
  if (!data) {
    return null;
  }

  return {
    id: data.employee.id,
    passwordHash: data.employee.passwordHash || "",
    phone: data.employee.phone || "",
    permissions: {
      admin: data.role?.codeName === "admin",
    },
  };
};

export const dishCategoryAdapter = (
  data: DishCategorySchema[]
): DishCategoryModel[] => {
  return data.map((x) => ({
    id: x.id,
    name: x.name || "",
    imageUrl: x.imageUrl || "",
  }));
};

export const dishAdapter = (data: DishSchema[]): DishModel[] => {
  return data.map((x) => ({
    id: x.dish.id,
    category: x.dish_category
      ? {
          id: x.dish_category.id || "",
          name: x.dish_category.name || "",
        }
      : null,
    name: x.dish.name || "",
    description: x.dish.description || "",
    imageUrl: x.dish.imageUrl || "",
    isActive: x.dish.isActive || false,
    weight: Number(x.dish.weight),
    price: Number(x.dish.price),
  }));
};
