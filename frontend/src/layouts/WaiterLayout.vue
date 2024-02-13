<template>
  <main-layout :menu-list="menuList">
    <template #actions>
      <NotificationsBell
        :is-loading="isSubscribing"
        :notification-count="notificationCount"
      >
        <template #notification-list>
          <cash-payment-request
            v-for="request in cashPaymentRequests"
            :key="request.id"
            :request="request"
          />
          <cooked-order-notification
            v-for="order of cookedOrders"
            :key="order.order.id"
            :order="order"
          />
          <dish-in-order
            v-for="item of cookedDishes"
            :key="item.dish.dishIdInOrder"
            :dish="item.dish"
            :count="item.dish.count"
            :order="item.order"
            view-only
            hide-price
          >
            <template #additonal-info>
              <div class="text-body2">
                <div>
                  {{ t.tableNumber }}
                  {{ item.order.table.number || "-" }},
                </div>
                <OrderNumberTitle
                  :order-number="item.order.orderNumber"
                  is-link
                />
              </div>
            </template>
            <template #actions>
              <cooked-dish-status-button :cooked-dish="item" />
            </template>
          </dish-in-order>
        </template>
      </NotificationsBell>
      <q-btn
        class="q-mr-sm shopping-basket"
        flat
        round
        icon="o_shopping_basket"
        @click="toggleCurrentOrderDrawer"
        :title="t.openCurrentOrder"
      >
        <q-tooltip> {{ t.openCurrentOrder }} </q-tooltip>
        <CurrentOrderDishesBadge />
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
          <current-order-view />
        </template>
      </order-drawer>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS, CHANNELS } from "donut-shared";
import {
  closeCurrentOrderAction,
  openCurrentOrderAction,
} from "donut-shared/src/actions/order-drawer";
import CashPaymentRequest from "src/components/CashPaymentRequest.vue";
import CookedDishStatusButton from "src/components/CookedDishStatusButton.vue";
import CookedOrderNotification from "src/components/CookedOrderNotification.vue";
import CurrentOrderDishesBadge from "src/components/CurrentOrderDishesBadge.vue";
import CurrentOrderView from "src/components/CurrentOrderView.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import NotificationsBell from "src/components/NotificationsBell.vue";
import OrderDrawer from "src/components/OrderDrawer.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
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
    icon: "o_receipt_long",
    label: t.value.orders,
    to: "/waiter/orders",
    meta: t.value.orders,
  },
];

const store = useStore();
const isCurrentOrderOpen = computed(
  () => store.state.orderDrawer.isCurrentOrderOpen
);
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? []
    : [
        CHANNELS.COOKED_DISHES_OF_EMPLOYEE(userId.value),
        CHANNELS.CASH_PAYMENT_REQUESTS_OF_EMPLOYEE(userId.value),
        CHANNELS.COOKED_ORDERS(userId.value),
      ];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const cookedDishes = computed(() => store.state.orders.cookedDishes);
const cookedOrders = computed(() => store.state.orders.cookedOrders);
const cashPaymentRequests = computed(
  () => store.state.cashPaymentRequests.requests
);
const notificationCount = computed(
  () =>
    cookedDishes.value.length +
    cashPaymentRequests.value.length +
    cookedOrders.value.length
);
const unsubscribe = ref(() => {
  /* */
});

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
