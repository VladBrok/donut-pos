import { browser, createI18n, localeFrom, params } from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";
import { USER_NOT_FOUND, WRONG_PASSWORD } from "donut-shared";

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
});

export function useI18nStore() {
  return useNanoStore(messages);
}
