<template>
  <main-layout :menu-list="menuList"> </main-layout>
</template>

<script setup lang="ts">
import MainLayout from "../components/MainLayout.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const menuList = [
  {
    icon: "o_query_stats",
    label: t.value.dashboard,
    to: "/admin/dashboard",
    meta: t.value.dashboard,
  },
  {
    icon: "o_menu_book",
    label: t.value.dishCategories,
    to: "/admin/dish-categories",
    meta: t.value.dishCategories,
  },
  {
    icon: "o_ramen_dining",
    label: t.value.dishes,
    to: "/admin/dishes",
    meta: t.value.dishes,
  },
  {
    icon: "o_tapas",
    label: t.value.modifications,
    to: "/admin/modifications",
    meta: t.value.modifications,
  },
  {
    icon: "o_table_restaurant",
    label: t.value.diningTables,
    to: "/admin/dining-tables",
    meta: t.value.diningTables,
  },
  {
    icon: "o_badge",
    label: t.value.employees,
    to: "/admin/employees",
    meta: t.value.employees,
  },
  {
    icon: "o_person",
    label: t.value.clients,
    to: "/admin/clients",
    meta: t.value.clients,
  },
  {
    icon: "o_storefront",
    label: t.value.salePoints,
    to: "/admin/sale-points",
    meta: t.value.salePoints,
  },
];
</script>
