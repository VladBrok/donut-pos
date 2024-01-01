import {
  DishInOrderStatus,
  EMPLOYEE_PERMISSIONS,
  OrderStatus,
} from "donut-shared";
import { ICookedDish, IShallowOrder } from "donut-shared/src/actions/orders.js";
import { onlyUnique } from "src/lib/only-unique.js";
import {
  DiningTableModel,
  DishCategoryModel,
  DishModel,
  EmployeeModel,
  ModificationModel,
  OrderModel,
  RoleModel,
} from "./models.js";
import {
  DiningTableSchema,
  DishCategorySchema,
  DishInOrderSchema,
  DishSchema,
  EmployeeSchema,
  ModificationSchema,
  OrderSchema,
  RoleSchema,
  ShallowOrderSchema,
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
    email: data[0].employee.email || "",
    isEmailVerified: data[0].employee.isEmailVerified || false,
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
      comment: uniqueOrder.order.comment || "",
      status: (uniqueOrder.order.status || "") as OrderStatus,
      createdDate: uniqueOrder.order.createdDate?.toISOString() || "",
      cookingDate: uniqueOrder.order.cookingDate?.toISOString() || "",
      cookedDate: uniqueOrder.order.cookedDate?.toISOString() || "",
      deliveringDate: uniqueOrder.order.deliveringDate?.toISOString() || "",
      deliveredDate: uniqueOrder.order.deliveredDate?.toISOString() || "",
      paidDate: uniqueOrder.order.paidDate?.toISOString() || "",
      table: {
        id: uniqueOrder.dining_table?.id || "",
        number: uniqueOrder.dining_table?.number || "",
        employeeId: uniqueOrder.dining_table?.employeeId || "",
      },
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
      dishes: data
        .filter(
          (order) =>
            order.order.id === uniqueOrder.order.id && order.order_to_dish
        )
        .filter(onlyUnique((item) => item.order_to_dish?.id || ""))
        .map((order) => ({
          id: order.dish?.id || "",
          dishIdInOrder: order.order_to_dish?.id || "",
          status: (order.order_to_dish?.status || "") as DishInOrderStatus,
          cookingDate: order.order_to_dish?.cookingDate?.toISOString() || "",
          cookedDate: order.order_to_dish?.cookedDate?.toISOString() || "",
          deliveredDate:
            order.order_to_dish?.deliveredDate?.toISOString() || "",
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
                innerOrder.order.id === order.order.id &&
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

export const shallowOrdersAdapter = (
  data: ShallowOrderSchema[]
): IShallowOrder[] => {
  return data
    .filter(onlyUnique((item) => item.order.id))
    .map((uniqueOrder) => ({
      id: uniqueOrder.order.id,
      orderNumber: uniqueOrder.order.number || "",
      comment: uniqueOrder.order.comment || "",
      status: (uniqueOrder.order.status || "") as OrderStatus,
      createdDate: uniqueOrder.order.createdDate?.toISOString() || "",
      cookingDate: uniqueOrder.order.cookingDate?.toISOString() || "",
      cookedDate: uniqueOrder.order.cookedDate?.toISOString() || "",
      deliveringDate: uniqueOrder.order.deliveringDate?.toISOString() || "",
      deliveredDate: uniqueOrder.order.deliveredDate?.toISOString() || "",
      paidDate: uniqueOrder.order.paidDate?.toISOString() || "",
      table: {
        id: uniqueOrder.dining_table?.id || "",
        number: uniqueOrder.dining_table?.number || "",
        employeeId: uniqueOrder.dining_table?.employeeId || "",
      },
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
    }));
};

export const cookedDishesAdapter = (
  data: DishInOrderSchema[]
): ICookedDish[] => {
  return data
    .filter((item) => item.order_to_dish)
    .filter(onlyUnique((item) => item.order_to_dish?.id || ""))
    .map((item) => ({
      order: shallowOrdersAdapter([item])[0],
      dish: {
        id: item.order?.id || "",
        dishIdInOrder: item?.order_to_dish?.id || "",
        status: (item.order_to_dish?.status || "") as DishInOrderStatus,
        cookingDate: item.order_to_dish?.cookingDate?.toISOString() || "",
        cookedDate: item.order_to_dish?.cookedDate?.toISOString() || "",
        deliveredDate: item.order_to_dish?.deliveredDate?.toISOString() || "",
        count: item.order_to_dish?.dishCount || 0,
        name: item.dish?.name || "",
        imageUrl: item.dish?.imageUrl || "",
        description: item.dish?.description || "",
        price: item.dish?.price || 0,
        weight: item.dish?.weight || 0,
        isActive: item.dish?.isActive || false,
      },
    }));
};

export const diningTableAdapter = (
  data: DiningTableSchema[]
): DiningTableModel[] => {
  return data.map((x) => ({
    id: x.id || "",
    employeeId: x.employeeId || "",
    number: x.number || "",
  }));
};
