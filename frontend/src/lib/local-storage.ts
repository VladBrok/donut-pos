import { ICurrentOrder } from "donut-shared";
import { loggedInAction } from "donut-shared/src/actions/auth";

export enum Keys {
  User = "user_data",
  CurrentOrder = "current_order",
}

export function getItem<T extends object>(key: Keys): T | null {
  const str = localStorage.getItem(key);
  if (!str) {
    return null;
  }
  return JSON.parse(str);
}

export function setItem<T extends object>(key: Keys, value: T): void {
  const str = JSON.stringify(value);
  localStorage.setItem(key, str);
}

export function removeItem(key: Keys): void {
  localStorage.removeItem(key);
}

export function saveUserToStorage(
  user: Partial<ReturnType<typeof loggedInAction>["payload"]>
) {
  setItem(Keys.User, user);
}

export function getUserFromStorage():
  | ReturnType<typeof loggedInAction>["payload"]
  | null {
  return getItem(Keys.User);
}

export function saveCurrentOrderToStorage(order: ICurrentOrder | null) {
  if (order) {
    setItem(Keys.CurrentOrder, order);
  } else {
    removeItem(Keys.CurrentOrder);
  }
}

export function getCurrentOrderFromStorage(): ICurrentOrder | null {
  return getItem(Keys.CurrentOrder);
}
