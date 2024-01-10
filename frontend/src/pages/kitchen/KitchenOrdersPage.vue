<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <TransitionGroup
        v-if="orders.length"
        tag="div"
        name="fade"
        class="card-grid-lg"
      >
        <KitchenOrderView
          v-for="order in orders"
          :key="order.id"
          :order="order"
        />
      </TransitionGroup>
      <NoData v-else> </NoData>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import KitchenOrderView from "src/components/KitchenOrderView.vue";
import NoData from "src/components/NoData.vue";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const channels = computed(() => [CHANNELS.ORDERS_FOR_KITCHEN]);
const isSubscribing = useSubscription(channels, { store: store as any });
const orders = computed(() => store.state.orders.ordersForKitchen);
</script>
