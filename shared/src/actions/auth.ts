import { EMPLOYEE_PERMISSIONS } from "src/constants/employee.js";
import { createAction } from "./index.js";
import { loadRolesAction } from "./roles.js";

export interface IPermissions {
  [EMPLOYEE_PERMISSIONS.ADMIN]?: boolean;
  [EMPLOYEE_PERMISSIONS.WAITER]?: boolean;
  [EMPLOYEE_PERMISSIONS.COURIER]?: boolean;
  [EMPLOYEE_PERMISSIONS.COOK]?: boolean;
  [EMPLOYEE_PERMISSIONS.CLIENT]?: boolean;
}

export const loginAction = createAction<{
  email: string;
  password: string;
  permissions: IPermissions;
}>("auth/login");

export const signUpAction = createAction<{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}>("auth/signUp");

export const loggedInAction = createAction<{
  userId: string;
  accessToken: string;
  permissions: IPermissions;
  role?: ReturnType<typeof loadRolesAction>["payload"]["roles"][number];
  isNewUser?: boolean;
}>("auth/loggedIn");

export const logoutAction = createAction<{
  accessToken: string;
}>("auth/logOut");
