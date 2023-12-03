<template>
  <main-layout :menu-list="menuList"> </main-layout>
</template>

<script setup lang="ts">
import MainLayout from "../components/MainLayout.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const menuList = [
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
    icon: "o_person",
    label: t.value.employees,
    to: "/admin/employees",
    meta: t.value.employees,
  },
];
</script>
