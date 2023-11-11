import { loggedInAction } from "donut-shared";
import { getUserFromStorage } from "../../lib/local-storage";

export interface IAuthState {
  user: Partial<ReturnType<typeof loggedInAction>["payload"]>;
}

export const ANONYMOUS = {
  userId: "anonymous",
};

function state(): IAuthState {
  const fromStorage = getUserFromStorage();

  if (!fromStorage) {
    return {
      user: ANONYMOUS,
    };
  }

  return { user: fromStorage };
}

export default state;
