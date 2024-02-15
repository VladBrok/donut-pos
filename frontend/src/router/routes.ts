import {
  ADDRESSES_KEY,
  CLIENTS_KEY,
  CREATE_DINING_TABLE_KEY,
  CREATE_DISH_CATEGORY_KEY,
  CREATE_DISH_KEY,
  CREATE_EMPLOYEE_KEY,
  CREATE_MODIFICATION_KEY,
  CREATE_SALE_POINT_KEY,
  DASHBOARD_KEY,
  DINING_TABLES_KEY,
  DISHES_KEY,
  DISH_CATEGORIES_KEY,
  EMPLOYEES_KEY,
  LOGIN_KEY,
  MENU_KEY,
  MODIFICATIONS_KEY,
  ORDERS_KEY,
  ORDER_DETAILS_KEY,
  PAYMENT_SUCCESS_PAGE_KEY,
  SALE_POINTS_KEY,
  SIGNUP_KEY,
  UDPATE_SALE_POINT_KEY,
  UPDATE_DINING_TABLE_KEY,
  UPDATE_DISH_CATEGORY_KEY,
  UPDATE_DISH_KEY,
  UPDATE_EMPLOYEE_KEY,
  UPDATE_MODIFICATION_KEY,
} from "src/lib/constants";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // Admin
  {
    path: "/admin/login",
    component: () => import("pages/admin/AdminLogin.vue"),
    meta: {
      title: LOGIN_KEY,
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
          title: DASHBOARD_KEY,
        },
      },

      // Dish categories
      {
        path: "dish-categories",
        component: () =>
          import("src/pages/admin/dish-categories/AdminDishCategories.vue"),
        meta: {
          title: DISH_CATEGORIES_KEY,
        },
      },
      {
        path: "dish-categories/create",
        component: () =>
          import(
            "src/pages/admin/dish-categories/AdminCreateUpdateDishCategory.vue"
          ),
        meta: {
          title: CREATE_DISH_CATEGORY_KEY,
        },
      },
      {
        path: "dish-categories/update/:id",
        component: () =>
          import(
            "src/pages/admin/dish-categories/AdminCreateUpdateDishCategory.vue"
          ),
        meta: {
          title: UPDATE_DISH_CATEGORY_KEY,
        },
      },

      // Dishes
      {
        path: "dishes",
        component: () => import("src/pages/admin/dishes/AdminDishes.vue"),
        meta: {
          title: DISHES_KEY,
        },
      },
      {
        path: "dishes/create",
        component: () =>
          import("src/pages/admin/dishes/AdminCreateUpdateDish.vue"),
        meta: {
          title: CREATE_DISH_KEY,
        },
      },
      {
        path: "dishes/update/:id",
        component: () =>
          import("src/pages/admin/dishes/AdminCreateUpdateDish.vue"),
        meta: {
          title: UPDATE_DISH_KEY,
        },
      },

      // Modifications
      {
        path: "modifications",
        component: () =>
          import("src/pages/admin/modifications/AdminModifications.vue"),
        meta: {
          title: MODIFICATIONS_KEY,
        },
      },
      {
        path: "modifications/create",
        component: () =>
          import(
            "src/pages/admin/modifications/AdminCreateUpdateModification.vue"
          ),
        meta: {
          title: CREATE_MODIFICATION_KEY,
        },
      },
      {
        path: "modifications/update/:id",
        component: () =>
          import(
            "src/pages/admin/modifications/AdminCreateUpdateModification.vue"
          ),
        meta: {
          title: UPDATE_MODIFICATION_KEY,
        },
      },

      // Employees
      {
        path: "employees",
        component: () => import("src/pages/admin/employees/AdminEmployees.vue"),
        meta: {
          title: EMPLOYEES_KEY,
        },
      },
      {
        path: "employees/create",
        component: () =>
          import("src/pages/admin/employees/AdminCreateUpdateEmployee.vue"),
        meta: {
          title: CREATE_EMPLOYEE_KEY,
        },
      },
      {
        path: "employees/update/:id",
        component: () =>
          import("src/pages/admin/employees/AdminCreateUpdateEmployee.vue"),
        meta: {
          title: UPDATE_EMPLOYEE_KEY,
        },
      },

      // Tables
      {
        path: "dining-tables",
        component: () =>
          import("src/pages/admin/dining-tables/AdminDiningTables.vue"),
        meta: {
          title: DINING_TABLES_KEY,
        },
      },
      {
        path: "dining-tables/create",
        component: () =>
          import(
            "src/pages/admin/dining-tables/AdminCreateUpdateDiningTable.vue"
          ),
        meta: {
          title: CREATE_DINING_TABLE_KEY,
        },
      },
      {
        path: "dining-tables/update/:id",
        component: () =>
          import(
            "src/pages/admin/dining-tables/AdminCreateUpdateDiningTable.vue"
          ),
        meta: {
          title: UPDATE_DINING_TABLE_KEY,
        },
      },

      // Clients
      {
        path: "clients",
        component: () => import("src/pages/admin/clients/AdminClients.vue"),
        meta: {
          title: CLIENTS_KEY,
        },
      },

      // Sale points
      {
        path: "sale-points",
        component: () =>
          import("src/pages/admin/sale-points/AdminSalePoints.vue"),
        meta: {
          title: SALE_POINTS_KEY,
        },
      },
      {
        path: "sale-points/create",
        component: () =>
          import("src/pages/admin/sale-points/AdminCreateUpdateSalePoint.vue"),
        meta: {
          title: CREATE_SALE_POINT_KEY,
        },
      },
      {
        path: "sale-points/update/:id",
        component: () =>
          import("src/pages/admin/sale-points/AdminCreateUpdateSalePoint.vue"),
        meta: {
          title: UDPATE_SALE_POINT_KEY,
        },
      },
    ],
  },

  // Waiter
  {
    path: "/waiter/login",
    component: () => import("pages/waiter/WaiterLogin.vue"),
    meta: {
      title: LOGIN_KEY,
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
          title: MENU_KEY,
        },
      },
      {
        path: "orders",
        component: () => import("pages/waiter/WaiterOrdersPage.vue"),
        meta: {
          title: ORDERS_KEY,
        },
      },
    ],
  },

  // Kitchen
  {
    path: "/kitchen/login",
    component: () => import("pages/kitchen/KitchenLogin.vue"),
    meta: {
      title: LOGIN_KEY,
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
          title: ORDERS_KEY,
        },
      },
    ],
  },

  // Payment
  {
    path: "/payment-success/:orderNumber",
    component: () => import("src/pages/PaymentSuccess.vue"),
    meta: {
      title: PAYMENT_SUCCESS_PAGE_KEY,
    },
  },

  // Client
  {
    path: "/orders/:orderNumber",
    component: () => import("src/pages/client/ClientSingleOrder.vue"),
    meta: {
      title: ORDER_DETAILS_KEY,
    },
  },
  {
    path: "/order-via-qr", // TODO: remove this page later
    component: () => import("src/pages/OrderViaQR.vue"),
    meta: {
      title: ORDER_DETAILS_KEY,
    },
  },
  {
    path: "/login",
    component: () => import("pages/client/ClientLogin.vue"),
    meta: {
      title: LOGIN_KEY,
    },
  },
  {
    path: "/sign-up",
    component: () => import("pages/client/ClientSignUp.vue"),
    meta: {
      title: SIGNUP_KEY,
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
          title: MENU_KEY,
        },
      },
      {
        path: "orders",
        component: () => import("pages/client/ClientOrdersPage.vue"),
        meta: {
          title: ORDERS_KEY,
        },
      },
      {
        path: "addresses",
        component: () => import("pages/client/ClientAddressesPage.vue"),
        meta: {
          title: ADDRESSES_KEY,
        },
      },
    ],
  },

  // Courier
  {
    path: "/courier/login",
    component: () => import("pages/courier/CourierLogin.vue"),
    meta: {
      title: LOGIN_KEY,
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
          title: ORDERS_KEY,
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
