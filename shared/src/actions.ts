import { actionCreatorFactory } from "typescript-fsa";

const createAction = actionCreatorFactory();

export const loginAction = createAction<{
  phone: string;
  password: string;
}>("auth/login");

export const loggedInAction = createAction<{
  userId: string;
  accessToken: string;
  refreshToken: string;
}>("auth/loggedIn");
