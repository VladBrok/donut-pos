import { createAction } from "./index.js";
import { loadRolesAction } from "./roles.js";

export const loadEmployeesAction = createAction<{
  employees: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    registeredAt: string;
    role: ReturnType<typeof loadRolesAction>["payload"]["roles"][number];
  }[];
}>("employees/load");

export const deleteEmployeeAction = createAction<{
  id: string;
}>("employees/delete");

export const createEmployeeAction = createAction<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: ReturnType<typeof loadRolesAction>["payload"]["roles"][number];
}>("employees/create");

export const employeeCreatedAction =
  createAction<
    ReturnType<typeof loadEmployeesAction>["payload"]["employees"][number]
  >("employees/created");

export const updateEmployeeAction = createAction<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: ReturnType<typeof loadRolesAction>["payload"]["roles"][number];
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
