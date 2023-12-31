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
    meta: {
      title: t.value.logIn,
    },
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

      // Employees
      {
        path: "employees",
        component: () => import("src/pages/admin/employees/AdminEmployees.vue"),
        meta: {
          title: t.value.employees,
        },
      },
      {
        path: "employees/create",
        component: () =>
          import("src/pages/admin/employees/AdminCreateUpdateEmployee.vue"),
        meta: {
          title: t.value.createEmployee,
        },
      },
      {
        path: "employees/update/:id",
        component: () =>
          import("src/pages/admin/employees/AdminCreateUpdateEmployee.vue"),
        meta: {
          title: t.value.updateEmployee,
        },
      },
    ],
  },

  // Waiter
  {
    path: "/waiter/login",
    component: () => import("pages/waiter/WaiterLogin.vue"),
    meta: {
      title: t.value.logIn,
    },
  },
  {
    path: "/waiter",
    component: () => import("layouts/WaiterLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/waiter/menu",
      },
      {
        path: "menu",
        component: () => import("src/pages/waiter/WaiterMenuPage.vue"),
        meta: {
          title: t.value.menu,
        },
      },
      {
        path: "orders",
        component: () => import("pages/waiter/WaiterOrdersPage.vue"),
        meta: {
          title: t.value.orders,
        },
      },
    ],
  },

  // Kitchen
  {
    path: "/kitchen/login",
    component: () => import("pages/kitchen/KitchenLogin.vue"),
    meta: {
      title: t.value.logIn,
    },
  },
  {
    path: "/kitchen",
    component: () => import("layouts/KitchenLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/kitchen/orders",
      },
      {
        path: "orders",
        component: () => import("pages/kitchen/KitchenOrdersPage.vue"),
        meta: {
          title: t.value.orders,
        },
      },
    ],
  },

  // Payment
  {
    path: "/payment-success/:orderNumber",
    component: () => import("src/pages/PaymentSuccess.vue"),
    meta: {
      title: t.value.paymentSuccessPageTitle,
    },
  },

  // Client
  // TODO: same as for other roles - if not authed, redirect to ClientLogin + client layout
  // TODO: wrap this page in layout (clients layout or waiters layout or admins depending on who opens a page?)
  {
    path: "/orders/:orderNumber",
    component: () => import("src/pages/client/ClientSingleOrder.vue"),
    meta: {
      title: t.value.orderDetails,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
