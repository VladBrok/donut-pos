import { nextTick } from "vue";
import { NavigationHookAfter } from "vue-router";

export const afterEachGuard: NavigationHookAfter = (to, from) => {
  nextTick(() => {
    document.title = to.meta.title
      ? `${to.meta.title as string} | Donut`
      : "Donut";
  });
};
