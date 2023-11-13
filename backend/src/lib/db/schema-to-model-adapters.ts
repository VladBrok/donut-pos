import { DishCategoryModel, EmployeeModel } from "./models.js";
import { DishCategorySchema, SelectEmployeeSchema } from "./schemas.js";

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
