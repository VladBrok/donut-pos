import { loggedInAction } from "donut-shared";
import { getUserFromStorage } from "../../lib/local-storage";

export type AuthState = Partial<ReturnType<typeof loggedInAction>["payload"]>;

function state(): AuthState {
  const fromStorage = getUserFromStorage();
  if (!fromStorage) {
    return {
      userId: "anonymous",
    };
  }

  return fromStorage;
}

export default state;
