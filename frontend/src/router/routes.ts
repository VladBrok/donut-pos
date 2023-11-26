import { RouteRecordRaw } from "vue-router";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/admin/login",
  },

  // Admin
  {
    path: "/admin/login",
    component: () => import("pages/admin/AdminLogin.vue"),
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

      // Dish categories
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
          import(
            "src/pages/admin/dish-categories/AdminCreateUpdateDishCategory.vue"
          ),
        meta: {
          title: t.value.createDishCategory,
        },
      },
      {
        path: "dish-categories/update/:id",
        component: () =>
          import(
            "src/pages/admin/dish-categories/AdminCreateUpdateDishCategory.vue"
          ),
        meta: {
          title: t.value.updateDishCategory,
        },
      },

      // Dishes
      {
        path: "dishes",
        component: () => import("src/pages/admin/dishes/AdminDishes.vue"),
        meta: {
          title: t.value.dishes,
        },
      },
      {
        path: "dishes/create",
        component: () =>
          import("src/pages/admin/dishes/AdminCreateUpdateDish.vue"),
        meta: {
          title: t.value.createDish,
        },
      },
      {
        path: "dishes/update/:id",
        component: () =>
          import("src/pages/admin/dishes/AdminCreateUpdateDish.vue"),
        meta: {
          title: t.value.updateDish,
        },
      },

      // Modifications
      {
        path: "modifications",
        component: () =>
          import("src/pages/admin/modifications/AdminModifications.vue"),
        meta: {
          title: t.value.modifications,
        },
      },
      {
        path: "modifications/create",
        component: () =>
          import(
            "src/pages/admin/modifications/AdminCreateUpdateModification.vue"
          ),
        meta: {
          title: t.value.createModification,
        },
      },
      {
        path: "modifications/update/:id",
        component: () =>
          import(
            "src/pages/admin/modifications/AdminCreateUpdateModification.vue"
          ),
        meta: {
          title: t.value.updateModification,
        },
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
