import { loggedInAction } from "donut-shared";

export enum Keys {
  User = "user_data",
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

export function getUserFromStorage(): ReturnType<typeof loggedInAction> | null {
  return getItem(Keys.User);
}
