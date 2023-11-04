import { NavigationGuardWithThis } from "vue-router";
import { useStore } from "../store";

export const beforeEachGuard: NavigationGuardWithThis<undefined> = (
  to,
  from
) => {
  const store = useStore();
  const user = store.state.auth;

  if (to.path.startsWith("/admin") && !user.permissions?.admin) {
    return "/admin/login";
  }

  if (to.path.startsWith("/admin/login") && user.permissions?.admin) {
    return "/admin";
  }
};
