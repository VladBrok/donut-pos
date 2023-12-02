import {
  DishCategoryModel,
  DishModel,
  EmployeeModel,
  ModificationModel,
  RoleModel,
} from "./models.js";
import {
  DishCategorySchema,
  DishSchema,
  EmployeeSchema,
  ModificationSchema,
  RoleSchema,
} from "./schemas.js";

export const employeeAdapter = (
  data: EmployeeSchema[]
): EmployeeModel | null => {
  if (!data.length) {
    return null;
  }

  return {
    id: data[0].employee.id,
    passwordHash: data[0].employee.passwordHash || "",
    phone: data[0].employee.phone || "",
    isPhoneVerified: data[0].employee.isPhoneVerified || false,
    registeredAt: data[0].employee.registeredAt?.toISOString() || "",
    role: {
      id: data[0].role?.id || "",
      codeName: data[0].role?.codeName || "",
    },
    firstName: data[0].employee.firstName || "",
    lastName: data[0].employee.lastName || "",
    permissions: {
      admin: data.some((x) => x.permission?.codeName === "admin"),
      cook: data.some((x) => x.permission?.codeName === "cook"),
      waiter: data.some((x) => x.permission?.codeName === "waiter"),
      courier: data.some((x) => x.permission?.codeName === "courier"),
    },
  };
};

export const employeesManyAdapter = (
  data: EmployeeSchema[]
): EmployeeModel[] => {
  const ids = new Set(data.map((x) => x.employee.id));

  return [...ids].map(
    (id) => employeeAdapter(data.filter((x) => x.employee.id === id))!
  );
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

export const roleAdapter = (data: RoleSchema[]): RoleModel[] => {
  return data.map((x) => ({
    id: x.id,
    codeName: x.codeName || "",
  }));
};
