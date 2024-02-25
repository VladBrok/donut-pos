import { useIsLoggedIn } from "src/lib/composables/useIsLoggedIn";
import { NavigationGuardWithThis } from "vue-router";
import { useStore } from "../store";

export const beforeEachGuard: NavigationGuardWithThis<undefined> = (
  to,
  from
) => {
  const store = useStore();
  const user = store.state.auth.user;
  const isLoggedIn = useIsLoggedIn();

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

  if (
    to.path.startsWith("/waiter") &&
    !to.path.startsWith("/waiter/login") &&
    !user.permissions?.waiter
  ) {
    return "/waiter/login";
  }

  if (to.path.startsWith("/waiter/login") && user.permissions?.waiter) {
    return "/waiter";
  }

  if (
    to.path.startsWith("/kitchen") &&
    !to.path.startsWith("/kitchen/login") &&
    !user.permissions?.cook
  ) {
    return "/kitchen/login";
  }

  if (to.path.startsWith("/kitchen/login") && user.permissions?.cook) {
    return "/kitchen";
  }

  if (
    to.path.startsWith("/courier") &&
    !to.path.startsWith("/courier/login") &&
    !user.permissions?.courier
  ) {
    return "/courier/login";
  }

  if (to.path.startsWith("/courier/login") && user.permissions?.courier) {
    return "/courier";
  }

  if (
    isLoggedIn.value &&
    !user.permissions?.client &&
    !to.path.startsWith("/login") &&
    !to.path.startsWith("/sign-up") &&
    !to.path.startsWith("/courier") &&
    !to.path.startsWith("/waiter") &&
    !to.path.startsWith("/kitchen") &&
    !to.path.startsWith("/admin") &&
    !to.path.startsWith("/demo")
  ) {
    return "/login";
  }

  if (
    (to.path.startsWith("/login") || to.path.startsWith("/sign-up")) &&
    user.permissions?.client
  ) {
    return "/";
  }
};
