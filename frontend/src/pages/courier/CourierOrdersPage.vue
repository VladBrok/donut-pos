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
        <CourierOrderView
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
import CourierOrderView from "src/components/CourierOrderView.vue";
import NoData from "src/components/NoData.vue";
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();
const userId = computed(() => store.state.auth.user.userId);
const orders = computed(() =>
  store.state.orders.ordersForCourier.filter(
    (x) => !x.employee || x.employee.id === userId.value
  )
);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? []
    : [CHANNELS.ORDERS_FOR_COURIERS];
});
const isSubscribing = useSubscription(channels, { store: store as any });
</script>
