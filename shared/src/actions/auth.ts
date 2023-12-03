import { EMPLOYEE_PERMISSIONS } from "../constants.js";
import { createAction } from "./index.js";
import { loadRolesAction } from "./roles.js";

export const loginAction = createAction<{
  phone: string;
  password: string;
  permissions: {
    [EMPLOYEE_PERMISSIONS.ADMIN]?: boolean;
    [EMPLOYEE_PERMISSIONS.WAITER]?: boolean;
    [EMPLOYEE_PERMISSIONS.COURIER]?: boolean;
    [EMPLOYEE_PERMISSIONS.COOK]?: boolean;
  };
}>("auth/login");

export const loggedInAction = createAction<{
  userId: string;
  accessToken: string;
  permissions: ReturnType<typeof loginAction>["payload"]["permissions"];
  role: ReturnType<typeof loadRolesAction>["payload"]["roles"][number];
}>("auth/loggedIn");

export const logoutAction = createAction<{
  accessToken: string;
}>("auth/logOut");
