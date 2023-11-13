import { RouteRecordRaw } from "vue-router";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/admin/login",
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/admin/AdminDashboard.vue"),
        meta: {
          title: t.value.dashboard,
        },
      },
      {
        path: "dish-categories",
        component: () => import("pages/admin/AdminDishCategories.vue"),
        meta: {
          title: t.value.dishCategories,
        },
      },
      {
        path: "dishes",
        component: () => import("pages/admin/AdminDishes.vue"),
        meta: {
          title: t.value.dishes,
        },
      },
    ],
  },

  {
    path: "/admin/login",
    component: () => import("pages/admin/AdminLogin.vue"),
  },

  {
    path: "/user",
    children: [
      {
        path: "profile",
        component: () => import("src/pages/ProfilePage.vue"),
      },
      {
        path: "feed",
        component: () => import("src/pages/PostsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
