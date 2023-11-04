import { NavigationGuardWithThis } from "vue-router";
import { useStore } from "../store";

export const beforeEachGuard: NavigationGuardWithThis<undefined> = (
  to,
  from
) => {
  const store = useStore();
  const user = store.state.auth.user;

  if (
    to.path.startsWith("/admin") &&
    !to.path.startsWith("/admin/login") &&
    !user.permissions?.admin
  ) {
    return "/admin/login";
  }

  if (to.path.startsWith("/admin/login") && user.permissions?.admin) {
    return "/admin";
  }
};
