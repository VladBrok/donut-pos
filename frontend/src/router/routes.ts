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
        component: () =>
          import("src/pages/admin/dish-categories/AdminDishCategories.vue"),
        meta: {
          title: t.value.dishCategories,
        },
      },
      {
        path: "dish-categories/create",
        component: () =>
          import("src/pages/admin/dish-categories/AdminCreateDishCategory.vue"),
        meta: {
          title: t.value.createDishCategory,
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
