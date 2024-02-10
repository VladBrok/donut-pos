import { RouteRecordRaw } from "vue-router";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const routes: RouteRecordRaw[] = [
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
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
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

      // Tables
      {
        path: "dining-tables",
        component: () =>
          import("src/pages/admin/dining-tables/AdminDiningTables.vue"),
        meta: {
          title: t.value.diningTables,
        },
      },
      {
        path: "dining-tables/create",
        component: () =>
          import(
            "src/pages/admin/dining-tables/AdminCreateUpdateDiningTable.vue"
          ),
        meta: {
          title: t.value.createDiningTable,
        },
      },
      {
        path: "dining-tables/update/:id",
        component: () =>
          import(
            "src/pages/admin/dining-tables/AdminCreateUpdateDiningTable.vue"
          ),
        meta: {
          title: t.value.updateDiningTable,
        },
      },

      // Clients
      {
        path: "clients",
        component: () => import("src/pages/admin/clients/AdminClients.vue"),
        meta: {
          title: t.value.clients,
        },
      },

      // Sale points
      {
        path: "sale-points",
        component: () =>
          import("src/pages/admin/sale-points/AdminSalePoints.vue"),
        meta: {
          title: t.value.salePoints,
        },
      },
      {
        path: "sale-points/create",
        component: () =>
          import("src/pages/admin/sale-points/AdminCreateUpdateSalePoint.vue"),
        meta: {
          title: t.value.createSalePoint,
        },
      },
      {
        path: "sale-points/update/:id",
        component: () =>
          import("src/pages/admin/sale-points/AdminCreateUpdateSalePoint.vue"),
        meta: {
          title: t.value.updateSalePoint,
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
  {
    path: "/orders/:orderNumber",
    component: () => import("src/pages/client/ClientSingleOrder.vue"),
    meta: {
      title: t.value.orderDetails,
    },
  },
  {
    path: "/order-via-qr", // TODO: remove this page later
    component: () => import("src/pages/OrderViaQR.vue"),
    meta: {
      title: t.value.orderDetails,
    },
  },
  {
    path: "/login",
    component: () => import("pages/client/ClientLogin.vue"),
    meta: {
      title: t.value.logIn,
    },
  },
  {
    path: "/sign-up",
    component: () => import("pages/client/ClientSignUp.vue"),
    meta: {
      title: t.value.signUp,
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
          title: t.value.menu,
        },
      },
      {
        path: "orders",
        component: () => import("pages/client/ClientOrdersPage.vue"),
        meta: {
          title: t.value.orders,
        },
      },
      {
        path: "addresses",
        component: () => import("pages/client/ClientAddressesPage.vue"),
        meta: {
          title: t.value.addresses,
        },
      },
    ],
  },

  // Courier
  {
    path: "/courier/login",
    component: () => import("pages/courier/CourierLogin.vue"),
    meta: {
      title: t.value.logIn,
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
          title: t.value.orders,
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
