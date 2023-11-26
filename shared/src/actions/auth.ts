import { createAction } from "./index.js";

export const loginAction = createAction<{
  phone: string;
  password: string;
  permissions: {
    admin?: boolean;
    waiter?: boolean;
    courier?: boolean;
    cook?: boolean;
  };
}>("auth/login");

export const loggedInAction = createAction<{
  userId: string;
  accessToken: string;
  permissions: ReturnType<typeof loginAction>["payload"]["permissions"];
}>("auth/loggedIn");

export const logoutAction = createAction<{
  accessToken: string;
}>("auth/logOut");
