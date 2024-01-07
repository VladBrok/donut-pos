<template>
  <main-layout :menu-list="menuList">
    <template #actions>
      <q-btn
        v-if="isLoggedIn"
        class="q-mr-md"
        flat
        round
        icon="o_notifications"
      >
        <q-tooltip> {{ t.showNotifications }} </q-tooltip>
        <q-spinner-rings
          v-if="isSubscribing"
          color="primary"
          size="40px"
          class="absolute-top-right-offset"
        />
        <q-badge
          v-if="notificationCount"
          rounded
          floating
          color="red"
          :label="notificationCount || ''"
        />
        <q-menu fit style="overflow-x: hidden">
          <div style="min-width: 320px" class="q-px-xs">
            <TransitionGroup tag="div" name="fade">
              <CookedOrderNotification
                v-for="order of cookedOrders"
                :key="order.order.id"
                :order="order"
              />
            </TransitionGroup>
          </div>
        </q-menu>
      </q-btn>
      <q-btn
        class="q-mr-md shopping-basket"
        flat
        round
        icon="o_shopping_basket"
        @click="toggleCurrentOrderDrawer"
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
          <current-order-view> </current-order-view>
        </template>
      </order-drawer>

      <q-page-sticky position="top" expand style="z-index: 12">
        <Transition tag="div" name="fade-single">
          <q-banner
            v-if="isWelcomeBannerOpen"
            class="bg-white banner-border shadow-4"
            rounded
          >
            <div class="text-body1">
              <p class="text-center text-h6 q-mb-sm">
                {{ t.welcome }}
              </p>
              <p>
                {{ t.chooseDishesInstruction }}
              </p>
              <p>
                {{ t.viewOrdersInstruction }}
                <router-link
                  to="/orders"
                  class="link"
                  @click="closeWelcomeBanner"
                  >{{ t.ordersPage }}</router-link
                >
              </p>
            </div>
            <template v-slot:action>
              <q-btn
                flat
                color="primary"
                :label="t.close"
                @click="closeWelcomeBanner"
              />
            </template>
          </q-banner>
        </Transition>
      </q-page-sticky>
    </template>
  </main-layout>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { ANONYMOUS, CHANNELS, closeWelcomeBannerAction } from "donut-shared";
import {
  closeCurrentOrderAction,
  openCurrentOrderAction,
} from "donut-shared/src/actions/order-drawer";
import CookedOrderNotification from "src/components/CookedOrderNotification.vue";
import CurrentOrderDishesBadge from "src/components/CurrentOrderDishesBadge.vue";
import CurrentOrderView from "src/components/CurrentOrderView.vue";
import OrderDrawer from "src/components/OrderDrawer.vue";
import { useIsLoggedIn } from "src/lib/composables/useIsLoggedIn";
import { useStore } from "src/store";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import MainLayout from "../components/MainLayout.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const menuList = [
  {
    icon: "o_restaurant_menu",
    label: t.value.menu,
    to: "/menu",
    meta: t.value.menu,
  },
  {
    icon: "o_receipt_long",
    label: t.value.orders,
    to: "/orders",
    meta: t.value.orders,
  },
];

const store = useStore();
const isCurrentOrderOpen = computed(
  () => store.state.orderDrawer.isCurrentOrderOpen
);
const isWelcomeBannerOpen = computed(() => store.state.welcomeBanner.isOpen);
const isLoggedIn = useIsLoggedIn();
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? []
    : [CHANNELS.COOKED_ORDERS_OF_CLIENT(userId.value)];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const cookedOrders = computed(() => store.state.orders.cookedOrders);
const notificationCount = computed(() => cookedOrders.value.length);
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

function closeWelcomeBanner() {
  store.commit.crossTab(closeWelcomeBannerAction());
}
</script>
