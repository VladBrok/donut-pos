import { createI18n, localeFrom, browser } from "@nanostores/i18n";
import { useStore as useNanoStore } from "@nanostores/vue";

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
});

export function useI18nStore() {
  return useNanoStore(messages);
}
