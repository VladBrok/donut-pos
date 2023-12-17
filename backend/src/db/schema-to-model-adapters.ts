import {
  EMPLOYEE_PERMISSIONS,
  OrderStatus,
} from "donut-shared/src/constants.js";
import {
  DishCategoryModel,
  DishModel,
  EmployeeModel,
  ModificationModel,
  OrderModel,
  RoleModel,
} from "./models.js";
import {
  DishCategorySchema,
  DishSchema,
  EmployeeSchema,
  ModificationSchema,
  OrderSchema,
  RoleSchema,
} from "./schemas.js";

function onlyUnique<T>(getId: (item: T) => string) {
  return (value: T, index: number, array: T[]) =>
    array.findIndex((x) => getId(x) === getId(value)) === index;
}

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
      codeName: (data[0].role?.codeName as RoleModel["codeName"]) || "",
    },
    firstName: data[0].employee.firstName || "",
    lastName: data[0].employee.lastName || "",
    permissions: {
      admin: data.some(
        (x) => x.permission?.codeName === EMPLOYEE_PERMISSIONS.ADMIN
      ),
      cook: data.some(
        (x) => x.permission?.codeName === EMPLOYEE_PERMISSIONS.COOK
      ),
      waiter: data.some(
        (x) => x.permission?.codeName === EMPLOYEE_PERMISSIONS.WAITER
      ),
      courier: data.some(
        (x) => x.permission?.codeName === EMPLOYEE_PERMISSIONS.COURIER
      ),
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

export const modificationAdapter = (
  data: ModificationSchema[]
): ModificationModel[] => {
  return data.map((x) => ({
    id: x.id,
    imageUrl: x.imageUrl || "",
    name: x.name || "",
    weight: x.weight || 0,
    price: x.price || 0,
  }));
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
    weight: x.dish.weight || 0,
    price: x.dish.price || 0,
    modifications: data
      .filter((d) => d.dish.id === x.dish.id && d.modification)
      .map((d) => ({
        name: d.modification?.name || "",
        id: d.modification?.id || "",
        imageUrl: d.modification?.imageUrl || "",
        price: d.modification?.price || 0,
        weight: d.modification?.weight || 0,
      })),
  }));
};

export const roleAdapter = (data: RoleSchema[]): RoleModel[] => {
  return data.map((x) => ({
    id: x.id,
    codeName: (x.codeName as RoleModel["codeName"]) || "",
  }));
};

export const ordersAdapter = (data: OrderSchema[]): OrderModel[] => {
  return data
    .filter(onlyUnique((item) => item.order.id))
    .map((uniqueOrder) => ({
      id: uniqueOrder.order.id,
      orderNumber: uniqueOrder.order.number || "",
      tableNumber: uniqueOrder.order.tableNumber || "",
      comment: uniqueOrder.order.comment || "",
      client: uniqueOrder.client
        ? {
            id: uniqueOrder.client.id,
          }
        : null,
      employee: uniqueOrder.employee
        ? {
            id: uniqueOrder.employee.id,
            firstName: uniqueOrder.employee.firstName || "",
            lastName: uniqueOrder.employee.lastName || "",
          }
        : null,
      statuses: data
        .filter(
          (order) =>
            order.order.id === uniqueOrder.order.id && order.order_status
        )
        .filter(onlyUnique((item) => item.order_status?.id || ""))
        .map((order) => ({
          id: order.order_status?.id || "",
          codeName: (order.order_status?.codeName || "") as OrderStatus,
          date: order.order_to_order_status?.date?.toISOString() || "",
        })),
      dishes: data
        .filter(
          (order) => order.order.id === uniqueOrder.order.id && order.dish
        )
        .filter(onlyUnique((item) => item.dish?.id || ""))
        .map((order) => ({
          id: order.dish?.id || "",
          count: order.order_to_dish?.dishCount || 0,
          name: order.dish?.name || "",
          imageUrl: order.dish?.imageUrl || "",
          description: order.dish?.description || "",
          price: order.dish?.price || 0,
          weight: order.dish?.weight || 0,
          isActive: order.dish?.isActive || false,
          modifications: data
            .filter(
              (innerOrder) =>
                innerOrder.order.id === uniqueOrder.order.id &&
                innerOrder.dish?.id === order.dish?.id &&
                order.modification
            )
            .filter(onlyUnique((item) => item.modification?.id || ""))
            .map((order) => ({
              id: order.order?.id || "",
              name: order.modification?.name || "",
              imageUrl: order.modification?.imageUrl || "",
              price: order.modification?.price || 0,
              weight: order.modification?.weight || 0,
              count:
                order.order_to_dish_to_modification?.modificationCount || 0,
            })),
        })),
    }));
};
