import { loggedInAction } from "donut-shared/src/actions/auth";
import { ANONYMOUS } from "donut-shared/src/constants";
import { getUserFromStorage } from "../../lib/local-storage";

export interface IAuthState {
  user: Partial<ReturnType<typeof loggedInAction>["payload"]>;
}

const fromStorage = getUserFromStorage();

const state: IAuthState = {
  user: fromStorage || ANONYMOUS,
};

export default state;
