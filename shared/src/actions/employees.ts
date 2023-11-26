import { createAction } from "./index.js";

export const loadEmployeesAction = createAction<{
  employees: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    isPhoneVerified: boolean;
    registeredAt: string;
    role: {
      id: string;
      codeName: string;
    };
  }[];
}>("employees/load");

export const deleteEmployeeAction = createAction<{
  id: string;
}>("employees/delete");

export const createEmployeeAction = createAction<{
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: {
    id: string;
    codeName: string;
  };
}>("employees/create");

export const employeeCreatedAction =
  createAction<
    ReturnType<typeof loadEmployeesAction>["payload"]["employees"][number]
  >("employees/created");

export const updateEmployeeAction = createAction<{
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: {
    id: string;
    codeName: string;
  };
}>("employees/update");

export const employeeUpdatedAction =
  createAction<
    Partial<
      ReturnType<typeof loadEmployeesAction>["payload"]["employees"][number]
    >
  >("employees/updated");

export const employeeDeletedAction = createAction<{
  id: string;
}>("employees/deleted");
