<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      {{ JSON.stringify(orders, undefined, 4) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared/src/constants";
import BigSpinner from "src/components/BigSpinner.vue";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const channels = computed(() => [CHANNELS.CREATED_ORDERS]);
const isSubscribing = useSubscription(channels, { store: store as any });
const orders = computed(() => store.state.orders.createdOrders);
</script>
