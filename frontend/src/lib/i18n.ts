import { browser, createI18n, localeFrom, params } from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";
import { UserNotFound, WrongPassword } from "donut-shared";

// TODO: implement auto-translations (https://github.com/nanostores/i18n#translation-process) ?

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
  loginPageTitle: "Login to Admin panel",
  [UserNotFound]: params("User with phone {phone} was not found"),
  [WrongPassword]: "Wrong password",
});

export function useI18nStore() {
  return useNanoStore(messages);
}
