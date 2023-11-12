import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    // component: () => import("layouts/MainLayout.vue"),
    // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    redirect: "/admin/login",
  },

  {
    path: "/admin",
    component: () => import("pages/admin/AdminDashboard.vue"),
  },
  {
    path: "/admin/login",
    component: () => import("pages/admin/AdminLogin.vue"),
  },

  {
    path: "/user",
    component: () => import("src/layouts/UserLayout.vue"),
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
