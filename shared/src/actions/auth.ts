import { createAction } from "./index.js";

export const loginAction = createAction<{
  phone: string;
  password: string;
}>("auth/login");

export const loggedInAction = createAction<{
  userId: string;
  accessToken: string;
  permissions: {
    admin?: boolean;
  };
}>("auth/loggedIn");

export const logoutAction = createAction<{
  accessToken: string;
}>("auth/logOut");
