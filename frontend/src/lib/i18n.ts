import { browser, createI18n, localeFrom, params } from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "donut-shared";
import { DISH_CATEGORY_NOT_FOUND } from "donut-shared/src/errors";

export const locale = localeFrom(
  // atom("pl"),
  browser({
    available: ["en" /* "pl" */],
    fallback: "en",
  })
);

export const i18n = createI18n(locale, {
  async get(code) {
    return await import(`./translations/${code}.json`);
  },
});

export const messages = i18n("admin", {
  // Dashboard
  dashboard: "Dashboard",
  logout: "Logout",
  dishCategories: "Categories",
  dishes: "Dishes",
  image: "Image",
  name: "Name",
  perPage: "Records per page",
  addDishCategory: "Add category",
  deleteSuccess: "Deleted successfully",

  // Login page
  loginPageTitle: "Login to Admin panel",
  passwordRequired: "Please enter a password",
  phoneRequired: "Please enter a phone number",

  // Logux statuses
  disconnectedMessage: "Cannot connect to the server",
  disconnectedCaption: "Your changes have not been saved",
  protocolErrorMessage: "Saving is not working",
  protocolErrorCaption: "Refresh the page",
  sending: "Saving changes",
  synchronized: "Saved",

  // Errors
  [USER_NOT_FOUND]: params("User with phone {phone} was not found"),
  [WRONG_PASSWORD]: "Wrong password",
  [DISH_CATEGORY_NOT_FOUND]: "Dish category was not found",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
