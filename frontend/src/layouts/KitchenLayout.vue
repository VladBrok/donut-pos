<template>
  <main-layout :menu-list="menuList"> </main-layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MainLayout from "../components/MainLayout.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const menuList = computed(() => [
  {
    icon: "o_receipt_long",
    label: t.value.orders,
    to: "/kitchen/orders",
    meta: t.value.orders,
  },
]);
</script>
