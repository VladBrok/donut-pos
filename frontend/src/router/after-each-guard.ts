import { useI18nStore } from "src/lib/i18n";
import { nextTick } from "vue";
import { NavigationHookAfter } from "vue-router";

export const afterEachGuard: NavigationHookAfter = (to, from) => {
  const t = useI18nStore();

  nextTick(() => {
    document.title = to.meta.title
      ? `${t.value[to.meta.title as string]} | Donut`
      : "Donut";
  });
};
