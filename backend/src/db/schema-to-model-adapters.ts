import {
  EMPLOYEE_PERMISSIONS,
  IAddress,
  ICashPaymentRequest,
  IClient,
  OrderStatus,
  OrderType,
} from "donut-shared";
import { IDiningTable } from "donut-shared/src/actions/current-order.js";
import {
  ICookedDish,
  IDishInOrder,
  IOrder,
  IShallowOrder,
} from "donut-shared/src/actions/orders.js";
import { onlyUnique } from "src/lib/only-unique.js";
import {
  DishCategoryModel,
  DishModel,
  EmployeeModel,
  ModificationModel,
  RoleModel,
} from "./models.js";
import {
  AddressSchema,
  CashPaymentRequestSchema,
  ClientSchema,
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
      client: false,
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

export const ordersAdapter = (data: OrderSchema[]): IOrder[] => {
  return data
    .filter(onlyUnique((item) => item.order.id))
    .map((uniqueOrder) => ({
      id: uniqueOrder.order.id,
      orderNumber: uniqueOrder.order.number || "",
      type: uniqueOrder.order?.type as OrderType,
      comment: uniqueOrder.order.comment || "",
      status: (uniqueOrder.order.status || "") as OrderStatus,
      createdDate: uniqueOrder.order.createdDate?.toISOString() || "",
      cookingDate: uniqueOrder.order.cookingDate?.toISOString() || "",
      cookedDate: uniqueOrder.order.cookedDate?.toISOString() || "",
      deliveringDate: uniqueOrder.order.deliveringDate?.toISOString() || "",
      address: uniqueOrder.order.deliveryAddress || "",
      deliveredDate: uniqueOrder.order.deliveredDate?.toISOString() || "",
      paidDate: uniqueOrder.order.paidDate?.toISOString() || "",
      table: {
        id: uniqueOrder.dining_table?.id || "",
        number: uniqueOrder.dining_table?.number || "",
        employee: {
          id: uniqueOrder.diningTableEmployee?.id || "",
          firstName: uniqueOrder.diningTableEmployee?.firstName || "",
          lastName: uniqueOrder.diningTableEmployee?.lastName || "",
          email: uniqueOrder.diningTableEmployee?.email || "",
        },
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
      dishes: uniqueOrder.order_to_dishes?.dishes as IDishInOrder[],
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
      type: uniqueOrder.order?.type as OrderType,
      status: (uniqueOrder.order.status || "") as OrderStatus,
      createdDate: uniqueOrder.order.createdDate?.toISOString() || "",
      cookingDate: uniqueOrder.order.cookingDate?.toISOString() || "",
      cookedDate: uniqueOrder.order.cookedDate?.toISOString() || "",
      deliveringDate: uniqueOrder.order.deliveringDate?.toISOString() || "",
      deliveredDate: uniqueOrder.order.deliveredDate?.toISOString() || "",
      paidDate: uniqueOrder.order.paidDate?.toISOString() || "",
      address: uniqueOrder.order.deliveryAddress,
      table: {
        id: uniqueOrder.dining_table?.id || "",
        number: uniqueOrder.dining_table?.number || "",
        employee: {
          id: uniqueOrder.diningTableEmployee?.id || "",
          firstName: uniqueOrder.diningTableEmployee?.firstName || "",
          lastName: uniqueOrder.diningTableEmployee?.lastName || "",
          email: uniqueOrder.diningTableEmployee?.email || "",
        },
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
  data: DishInOrderSchema[],
  dishIdInOrder?: string
): ICookedDish[] => {
  const dishes: ICookedDish[] = [];
  for (const dataEl of data) {
    if (dataEl.order_to_dishes) {
      dishes.push(
        ...(dataEl.order_to_dishes.dishes as IDishInOrder[])
          .filter((x) => x.cookedDate && !x.deliveredDate)
          .map((x) => ({
            order: shallowOrdersAdapter([dataEl])[0],
            dish: x,
          }))
      );
    }
  }

  if (!dishIdInOrder) {
    return dishes;
  }

  return dishes.filter((x) => x.dish.dishIdInOrder === dishIdInOrder);
};

export const diningTableAdapter = (
  data: DiningTableSchema[]
): IDiningTable[] => {
  return data.map((x) => ({
    id: x.dining_table.id || "",
    employee: {
      id: x.employee?.id || "",
      firstName: x.employee?.firstName || "",
      lastName: x.employee?.lastName || "",
      email: x.employee?.email || "",
    },
    number: x.dining_table.number || "",
  }));
};

export const addressAdapter = (data: AddressSchema[]): IAddress[] => {
  return data.map((x) => ({
    id: x.address.id || "",
    city: x.address.city || "",
    homeNumber: x.address.homeNumber || "",
    postalCode: x.address.postalCode || "",
    street: x.address.street || "",
  }));
};

export const clientAdapter = (data: ClientSchema[]): IClient[] => {
  return data.map((x) => ({
    id: x.client.id || "",
    email: x.client.email || "",
    isEmailVerified: x.client.isEmailVerified || false,
    phone: x.client.phone || "",
    isPhoneVerified: x.client.isPhoneVerified || false,
    firstName: x.client.firstName || "",
    lastName: x.client.lastName || "",
    registeredAt: x.client.registeredAt?.toISOString() || "",
    passwordHash: x.client.passwordHash || "",
  }));
};

export const cashPaymentRequestsAdapter = (
  data: CashPaymentRequestSchema[]
): ICashPaymentRequest[] => {
  return data.filter(onlyUnique((x) => x.cash_payment_request.id)).map((x) => ({
    id: x.cash_payment_request?.id || "",
    totalCost: x.cash_payment_request.totalCost || 0,
    comment: x.order?.comment || "",
    table: {
      id: x.dining_table?.id || "",
      number: x.dining_table?.number || "",
    },
    orderType: x.order?.type as OrderType,
    orderNumber: x.order?.number || "",
    status: x.order?.status || "",
    createdDate: x.order?.createdDate?.toISOString() || "",
    cookingDate: x.order?.cookingDate?.toISOString() || "",
    cookedDate: x.order?.cookedDate?.toISOString() || "",
    deliveringDate: x.order?.deliveringDate?.toISOString() || "",
    deliveredDate: x.order?.deliveredDate?.toISOString() || "",
    paidDate: x.order?.paidDate?.toISOString() || "",
    employeeId: x.order?.employeeId || "",
    clientId: x.order?.clientId || "",
  }));
};
