import { ANONYMOUS } from "donut-shared";
import { loggedInAction } from "donut-shared/src/actions/auth";
import { getUserFromStorage } from "../../lib/local-storage";

export interface IAuthState {
  user: Partial<ReturnType<typeof loggedInAction>["payload"]>;
}

const fromStorage = getUserFromStorage();

const state: IAuthState = {
  user: fromStorage || ANONYMOUS,
};

export default state;
