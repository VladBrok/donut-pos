<template>
  <main-layout :menu-list="menuList">
    <template #actions>
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
import {
  closeCurrentOrderAction,
  openCurrentOrderAction,
} from "donut-shared/src/actions/order-drawer";
import CurrentOrderView from "src/components/CurrentOrderView.vue";
import OrderDrawer from "src/components/OrderDrawer.vue";
import { useStore } from "src/store";
import { computed } from "vue";
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

function toggleCurrentOrderDrawer() {
  if (isCurrentOrderOpen.value) {
    store.commit.local(closeCurrentOrderAction());
  } else {
    store.commit.local(openCurrentOrderAction());
  }
}
</script>
