import {
  DishCategoryModel,
  DishModel,
  EmployeeModel,
  ModificationModel,
} from "./models.js";
import {
  DishCategorySchema,
  DishSchema,
  ModificationSchema,
  SelectEmployeeSchema,
} from "./schemas.js";

export const employeeAdapter = (
  data: SelectEmployeeSchema[]
): EmployeeModel | null => {
  if (!data.length) {
    return null;
  }

  return {
    id: data[0].employee.id,
    passwordHash: data[0].employee.passwordHash || "",
    phone: data[0].employee.phone || "",
    permissions: {
      admin: data.some((x) => x.permission?.codeName === "admin"),
      cook: data.some((x) => x.permission?.codeName === "cook"),
      waiter: data.some((x) => x.permission?.codeName === "waiter"),
      courier: data.some((x) => x.permission?.codeName === "courier"),
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
  const ids = new Set<string>();
  const unique: DishSchema[] = [];

  for (const el of data) {
    if (!ids.has(el.dish.id)) {
      ids.add(el.dish.id);
      unique.push(el);
    }
  }

  return unique.map((x) => ({
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
    modifications: data
      .filter((d) => d.dish.id === x.dish.id && d.modification)
      .map((d) => ({
        name: d.modification?.name || "",
        id: d.modification?.id || "",
      })),
  }));
};

export const modificationAdapter = (
  data: ModificationSchema[]
): ModificationModel[] => {
  return data.map((x) => ({
    id: x.id,
    imageUrl: x.imageUrl || "",
    name: x.name || "",
    weight: Number(x.weight),
    price: Number(x.price),
  }));
};
