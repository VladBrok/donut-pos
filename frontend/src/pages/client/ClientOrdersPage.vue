<template>
  <ClientAuthGuard>
    <template #text>
      {{ t.viewYourOrders }}
    </template>
    <template #content>
      <orders-list :get-channel="CHANNELS.ORDERS_OF_CLIENT" />
    </template>
  </ClientAuthGuard>
</template>

<script setup lang="ts">
import { CHANNELS } from "donut-shared";
import ClientAuthGuard from "src/components/ClientAuthGuard.vue";
import OrdersList from "src/components/OrdersList.vue";
import { useI18nStore } from "src/lib/i18n";

const t = useI18nStore();
</script>
