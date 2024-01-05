<template>
  <orders-list :get-channel="CHANNELS.ORDERS_OF_EMPLOYEE" />
</template>

<script setup lang="ts">
import { CHANNELS } from "donut-shared";
import OrdersList from "src/components/OrdersList.vue";
</script>
