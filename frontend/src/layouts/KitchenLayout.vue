<template>
  <main-layout :menu-list="menuList"> </main-layout>
</template>

<script setup lang="ts">
import MainLayout from "../components/MainLayout.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const menuList = [
  {
    icon: "o_local_mall",
    label: t.value.orders,
    to: "/kitchen/orders",
    meta: t.value.orders,
  },
];
</script>
