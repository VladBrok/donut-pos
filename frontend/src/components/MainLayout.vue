<template>
  <q-layout view="hHh LpR fFf" class="bg-gray-lightest">
    <q-header class="bg-white text-black shadow-up-1" bordered>
      <q-toolbar class="q-py-sm">
        <q-btn dense flat round icon="menu" @click="toggleMenuDrawer" />
        <q-toolbar-title>
          {{ $route.meta.title || "" }}
        </q-toolbar-title>
        <q-btn
          v-if="isWaiter"
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
        <q-btn flat round icon="logout" @click="logout">
          <q-tooltip> {{ t.logout }} </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="isMenuDrawerOpen"
      side="left"
      :width="240"
      bordered
    >
      <q-scroll-area class="fit">
        <!-- TODO: add logo here -->
        <div class="q-pa-sm">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                :active="$route.meta.title === menuItem.meta"
                v-ripple
                :to="menuItem.to"
              >
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" size="sm"> </q-icon>
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>
      </q-scroll-area>
    </q-drawer>

    <!-- TODO: extract logic related to Waiter to WaiterLayout -->

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

    <order-drawer
      :model-value="Boolean(selectedOrder)"
      @update:model-value="store.commit.local(closeArbitraryOrderAction())"
      @close="store.commit.local(closeArbitraryOrderAction())"
    >
      <template #title>
        <p v-if="selectedOrder" class="text-h5">
          <order-number-title
            :order-number="selectedOrder.orderNumber"
            copy-button-size="sm"
          />
        </p>
        <p v-if="selectedOrder" class="text-h6 text-weight-regular">
          {{ t.orderStatus.toLowerCase() }}:
          <span :class="`text-${getOrderCurrentStatus(selectedOrder)}`">
            {{ getOrderCurrentStatus(selectedOrder) }}
          </span>
        </p>
      </template>
      <template #content>
        <order-details-view v-if="selectedOrder" :order="selectedOrder">
        </order-details-view>
      </template>
    </order-drawer>

    <q-page-container>
      <div class="scroll full-width page-wrapper-height">
        <q-page padding>
          <div class="q-pb-xl q-pt-xl">
            <router-view />
          </div>
        </q-page>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { logoutAction } from "donut-shared/src/actions/auth";
import OrderDetailsView from "src/components/OrderDetailsView.vue";
import OrderDrawer from "src/components/OrderDrawer.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import { getOrderCurrentStatus } from "src/lib/order";
import { computed, ref } from "vue";
import {
  closeArbitraryOrderAction,
  closeCurrentOrderAction,
  openCurrentOrderAction,
} from "../../../shared";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import CurrentOrderView from "./CurrentOrderView.vue";

defineProps<{
  menuList: {
    icon: string;
    label: string;
    to: string;
    meta: string;
  }[];
}>();

const isMenuDrawerOpen = ref(false);
const t = useI18nStore();
const store = useStore();
const isWaiter = computed(
  () => store.state.auth.user.role?.codeName === "waiter"
);
const currentOrder = computed(() => store.state.currentOrder.order);
const selectedOrder = computed(() => store.state.orderDrawer.order);
const isCurrentOrderOpen = computed(
  () => store.state.orderDrawer.isCurrentOrderOpen
);

function toggleMenuDrawer() {
  isMenuDrawerOpen.value = !isMenuDrawerOpen.value;
}

function toggleCurrentOrderDrawer() {
  if (isCurrentOrderOpen.value) {
    store.commit.local(closeCurrentOrderAction());
  } else {
    store.commit.local(openCurrentOrderAction());
  }
}

function logout() {
  store.commit.crossTab(
    logoutAction({ accessToken: store.state.auth.user.accessToken || "" })
  );
}
</script>
