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
      <NoData v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS, CHANNELS } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import KitchenOrderView from "src/components/KitchenOrderView.vue";
import NoData from "src/components/NoData.vue";
import { useStore } from "src/store";
import { computed, onMounted, ref } from "vue";

const store = useStore();
const orders = computed(() => store.state.orders.ordersForCourier);
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? []
    : [CHANNELS.ORDERS_OF_COURIER(userId.value)];
});
const isSubscribing = useSubscription(channels, { store: store as any });
const unsubscribe = ref(() => {
  /* */
});

onMounted(() => {
  unsubscribe.value = store.client.on("user", (newId) => {
    userId.value = newId;
  });
});

onMounted(() => {
  unsubscribe.value();
});
</script>
