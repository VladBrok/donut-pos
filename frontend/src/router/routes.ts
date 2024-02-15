import { RouteRecordRaw } from "vue-router";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const routes: RouteRecordRaw[] = [
  // Admin
  {
    path: "/admin/login",
    component: () => import("pages/admin/AdminLogin.vue"),
    meta: {
      title: "logIn",
    },
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        component: () => import("pages/admin/AdminDashboard.vue"),
        meta: {
          title: "dashboard",
        },
      },

      // Dish categories
      {
        path: "dish-categories",
        component: () =>
          import("src/pages/admin/dish-categories/AdminDishCategories.vue"),
        meta: {
          title: "dishCategories",
        },
      },
      {
        path: "dish-categories/create",
        component: () =>
          import(
            "src/pages/admin/dish-categories/AdminCreateUpdateDishCategory.vue"
          ),
        meta: {
          title: "createDishCategory",
        },
      },
      {
        path: "dish-categories/update/:id",
        component: () =>
          import(
            "src/pages/admin/dish-categories/AdminCreateUpdateDishCategory.vue"
          ),
        meta: {
          title: "updateDishCategory",
        },
      },

      // Dishes
      {
        path: "dishes",
        component: () => import("src/pages/admin/dishes/AdminDishes.vue"),
        meta: {
          title: "dishes",
        },
      },
      {
        path: "dishes/create",
        component: () =>
          import("src/pages/admin/dishes/AdminCreateUpdateDish.vue"),
        meta: {
          title: "createDish",
        },
      },
      {
        path: "dishes/update/:id",
        component: () =>
          import("src/pages/admin/dishes/AdminCreateUpdateDish.vue"),
        meta: {
          title: "updateDish",
        },
      },

      // Modifications
      {
        path: "modifications",
        component: () =>
          import("src/pages/admin/modifications/AdminModifications.vue"),
        meta: {
          title: "modifications",
        },
      },
      {
        path: "modifications/create",
        component: () =>
          import(
            "src/pages/admin/modifications/AdminCreateUpdateModification.vue"
          ),
        meta: {
          title: "createModification",
        },
      },
      {
        path: "modifications/update/:id",
        component: () =>
          import(
            "src/pages/admin/modifications/AdminCreateUpdateModification.vue"
          ),
        meta: {
          title: "updateModification",
        },
      },

      // Employees
      {
        path: "employees",
        component: () => import("src/pages/admin/employees/AdminEmployees.vue"),
        meta: {
          title: "employees",
        },
      },
      {
        path: "employees/create",
        component: () =>
          import("src/pages/admin/employees/AdminCreateUpdateEmployee.vue"),
        meta: {
          title: "createEmployee",
        },
      },
      {
        path: "employees/update/:id",
        component: () =>
          import("src/pages/admin/employees/AdminCreateUpdateEmployee.vue"),
        meta: {
          title: "updateEmployee",
        },
      },

      // Tables
      {
        path: "dining-tables",
        component: () =>
          import("src/pages/admin/dining-tables/AdminDiningTables.vue"),
        meta: {
          title: "diningTables",
        },
      },
      {
        path: "dining-tables/create",
        component: () =>
          import(
            "src/pages/admin/dining-tables/AdminCreateUpdateDiningTable.vue"
          ),
        meta: {
          title: "createDiningTable",
        },
      },
      {
        path: "dining-tables/update/:id",
        component: () =>
          import(
            "src/pages/admin/dining-tables/AdminCreateUpdateDiningTable.vue"
          ),
        meta: {
          title: "updateDiningTable",
        },
      },

      // Clients
      {
        path: "clients",
        component: () => import("src/pages/admin/clients/AdminClients.vue"),
        meta: {
          title: "clients",
        },
      },

      // Sale points
      {
        path: "sale-points",
        component: () =>
          import("src/pages/admin/sale-points/AdminSalePoints.vue"),
        meta: {
          title: "salePoints",
        },
      },
      {
        path: "sale-points/create",
        component: () =>
          import("src/pages/admin/sale-points/AdminCreateUpdateSalePoint.vue"),
        meta: {
          title: "createSalePoint",
        },
      },
      {
        path: "sale-points/update/:id",
        component: () =>
          import("src/pages/admin/sale-points/AdminCreateUpdateSalePoint.vue"),
        meta: {
          title: "updateSalePoint",
        },
      },
    ],
  },

  // Waiter
  {
    path: "/waiter/login",
    component: () => import("pages/waiter/WaiterLogin.vue"),
    meta: {
      title: "logIn",
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
          title: "menu",
        },
      },
      {
        path: "orders",
        component: () => import("pages/waiter/WaiterOrdersPage.vue"),
        meta: {
          title: "orders",
        },
      },
    ],
  },

  // Kitchen
  {
    path: "/kitchen/login",
    component: () => import("pages/kitchen/KitchenLogin.vue"),
    meta: {
      title: "logIn",
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
          title: "orders",
        },
      },
    ],
  },

  // Payment
  {
    path: "/payment-success/:orderNumber",
    component: () => import("src/pages/PaymentSuccess.vue"),
    meta: {
      title: "paymentSuccessPageTitle",
    },
  },

  // Client
  {
    path: "/orders/:orderNumber",
    component: () => import("src/pages/client/ClientSingleOrder.vue"),
    meta: {
      title: "orderDetails",
    },
  },
  {
    path: "/order-via-qr", // TODO: remove this page later
    component: () => import("src/pages/OrderViaQR.vue"),
    meta: {
      title: "orderDetails",
    },
  },
  {
    path: "/login",
    component: () => import("pages/client/ClientLogin.vue"),
    meta: {
      title: "logIn",
    },
  },
  {
    path: "/sign-up",
    component: () => import("pages/client/ClientSignUp.vue"),
    meta: {
      title: "signUp",
    },
  },
  {
    path: "/",
    component: () => import("layouts/ClientLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/menu",
      },
      {
        path: "menu",
        component: () => import("src/pages/client/ClientMenuPage.vue"),
        meta: {
          title: "menu",
        },
      },
      {
        path: "orders",
        component: () => import("pages/client/ClientOrdersPage.vue"),
        meta: {
          title: "orders",
        },
      },
      {
        path: "addresses",
        component: () => import("pages/client/ClientAddressesPage.vue"),
        meta: {
          title: "addresses",
        },
      },
    ],
  },

  // Courier
  {
    path: "/courier/login",
    component: () => import("pages/courier/CourierLogin.vue"),
    meta: {
      title: "logIn",
    },
  },
  {
    path: "/courier",
    component: () => import("layouts/CourierLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/courier/orders",
      },
      {
        path: "orders",
        component: () => import("pages/courier/CourierOrdersPage.vue"),
        meta: {
          title: "orders",
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
