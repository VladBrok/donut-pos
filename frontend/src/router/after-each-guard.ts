import { useI18nStore } from "src/lib/i18n";
import { updateDocumentTitle } from "src/lib/update-document-title";
import { nextTick } from "vue";
import { NavigationHookAfter } from "vue-router";

export const afterEachGuard: NavigationHookAfter = (to, from) => {
  const t = useI18nStore();

  nextTick(() => {
    updateDocumentTitle(to.meta.title as string, t);
  });
};
