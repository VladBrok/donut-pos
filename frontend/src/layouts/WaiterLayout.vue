<template>
  <main-layout :menu-list="menuList">
    <template #actions>
      <q-btn class="q-mr-md" flat round icon="o_notifications">
        <q-tooltip> {{ t.showCookedOrders }} </q-tooltip>
        <q-badge
          v-if="cookedOrders.length"
          rounded
          floating
          color="red"
          :label="cookedOrders.length || ''"
        />
      </q-btn>
      <q-btn
        class="q-mr-md"
        flat
        round
        icon="o_shopping_basket"
        @click="toggleCurrentOrderDrawer"
      >
        <q-tooltip> {{ t.openCurrentOrder }} </q-tooltip>
        <q-badge
          v-if="currentOrder"
          rounded
          floating
          color="red"
          :label="currentOrder.dishes.length || ''"
        />
      </q-btn>
    </template>
    <template #drawers>
      <order-drawer
        :model-value="isCurrentOrderOpen"
        @update:model-value="store.commit.local(closeCurrentOrderAction())"
        @close="store.commit.local(closeCurrentOrderAction())"
      >
        <template #title>
          <p class="text-h5">
            {{ t.currentOrder }}
          </p>
        </template>
        <template #content>
          <current-order-view> </current-order-view>
        </template>
      </order-drawer>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  closeCurrentOrderAction,
  openCurrentOrderAction,
} from "donut-shared/src/actions/order-drawer";
import { ANONYMOUS } from "donut-shared/src/constants";
import CurrentOrderView from "src/components/CurrentOrderView.vue";
import OrderDrawer from "src/components/OrderDrawer.vue";
import { useStore } from "src/store";
import { computed, onMounted, onUnmounted, ref } from "vue";
import MainLayout from "../components/MainLayout.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const menuList = [
  {
    icon: "o_restaurant_menu",
    label: t.value.menu,
    to: "/waiter/menu",
    meta: t.value.menu,
  },
  {
    icon: "o_local_mall",
    label: t.value.orders,
    to: "/waiter/orders",
    meta: t.value.orders,
  },
];

const store = useStore();
const currentOrder = computed(() => store.state.currentOrder.order);
const isCurrentOrderOpen = computed(
  () => store.state.orderDrawer.isCurrentOrderOpen
);
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? []
    : [`cookedOrders/${userId.value}`];
});

let isSubscribing = useSubscription(channels, { store: store as any });
const unsubscribe = ref(() => {
  /* */
});
const cookedOrders = computed(() => store.state.orders.cookedOrders);

onMounted(() => {
  unsubscribe.value = store.client.on("user", (newId) => {
    userId.value = newId;
  });
});

onUnmounted(() => {
  unsubscribe.value();
});

function toggleCurrentOrderDrawer() {
  if (isCurrentOrderOpen.value) {
    store.commit.local(closeCurrentOrderAction());
  } else {
    store.commit.local(openCurrentOrderAction());
  }
}
</script>
