<template>
  <q-layout view="hHh LpR lfr" class="bg-gray-lightest">
    <q-header class="bg-white text-black shadow-up-1" bordered>
      <q-toolbar class="q-py-sm">
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleMenuDrawer"
          :title="t.toggleMenu"
        />
        <q-avatar class="q-pl-xs q-mr-xs">
          <logo-image no-text />
        </q-avatar>
        <q-toolbar-title>
          <h1 class="text-h6 text-weight-regular line-height-normal">
            {{ t[$route.meta.title?.toString() || ""] }}
          </h1>
        </q-toolbar-title>
        <LanguageSwitch class="q-mr-xs" />
        <slot name="actions" />
        <q-btn
          v-if="isLoggedIn"
          flat
          round
          icon="logout"
          color="negative"
          @click="isLogoutConfirmOpen = true"
          :title="t.logout"
        >
          <q-tooltip> {{ t.logout }} </q-tooltip>
        </q-btn>
        <q-btn
          v-if="!isLoggedIn"
          color="positive"
          flat
          round
          icon="login"
          to="/login"
          :title="t.logIn"
        >
          <q-tooltip> {{ t.logIn }} </q-tooltip>
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
        <div class="q-px-lg q-pt-lg q-pb-sm">
          <logo-image />
        </div>
        <div class="q-pa-sm">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item
                clickable
                :active="
                  t[$route.meta.title?.toString() || ''] === menuItem.meta
                "
                v-ripple
                :to="menuItem.to"
                role=""
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

    <slot name="drawers" />

    <order-drawer
      :model-value="Boolean(selectedOrder) || isSubscribing"
      @update:model-value="store.commit.local(closeArbitraryOrderAction())"
      @close="store.commit.local(closeArbitraryOrderAction())"
    >
      <template #title>
        <p v-if="selectedOrder" class="text-h5">
          <order-number-title
            :order-number="selectedOrder.orderNumber"
            is-link
          />
        </p>
        <p v-if="selectedOrder" class="text-h6 text-weight-regular">
          {{ t.orderStatus.toLowerCase() }}:
          <span :class="`text-${selectedOrder.status}`">
            {{ selectedOrder.status }}
          </span>
        </p>
      </template>
      <template #content>
        <order-details-view v-if="selectedOrder" :order="selectedOrder" />
        <big-spinner v-if="isSubscribing"></big-spinner>
      </template>
    </order-drawer>

    <q-page-container>
      <div class="scroll full-width page-wrapper-height overflow-x-hidden">
        <q-page padding>
          <div class="q-pb-xl q-pt-xl">
            <router-view />
          </div>
        </q-page>
        <CommonFooter />
      </div>
    </q-page-container>

    <confirm-dialog v-model="isLogoutConfirmOpen">
      <template #body> {{ t.confirmLogout }}? </template>
      <template #confirmButton>
        <q-btn flat :label="t.logout" color="negative" @click="logout" />
      </template>
    </confirm-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { logoutAction } from "donut-shared/src/actions/auth";
import BigSpinner from "src/components/BigSpinner.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import LanguageSwitch from "src/components/LanguageSwitch.vue";
import LogoImage from "src/components/LogoImage.vue";
import OrderDetailsView from "src/components/OrderDetailsView.vue";
import OrderDrawer from "src/components/OrderDrawer.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import { useIsLoggedIn } from "src/lib/composables/useIsLoggedIn";
import { computed, ref } from "vue";
import { CHANNELS, closeArbitraryOrderAction } from "../../../shared";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import CommonFooter from "./CommonFooter.vue";

defineProps<{
  menuList: {
    icon: string;
    label: string;
    to: string;
    meta: string;
  }[];
}>();

const isLogoutConfirmOpen = ref(false);
const isMenuDrawerOpen = ref(false);
const t = useI18nStore();
const store = useStore();
const userId = computed(() => store.state.auth.user.userId);
const isClient = computed(() => store.state.auth.user.permissions?.client);
const channels = computed(() => {
  return !store.state.orderDrawer.order ||
    userId.value === store.state.orderDrawer.order.employee?.id ||
    isClient.value
    ? []
    : [CHANNELS.ORDER_SINGLE(store.state.orderDrawer.order.orderNumber || "")];
});
const isSubscribing = useSubscription(channels, { store: store as any });
const selectedOrder = computed(() => {
  return isSubscribing.value
    ? null
    : userId.value === store.state.orderDrawer.order?.employee?.id ||
      !store.state.orderDrawer.order ||
      isClient.value
    ? store.state.orderDrawer.order
    : store.state.orders.order;
});
const isLoggedIn = useIsLoggedIn();

function toggleMenuDrawer() {
  isMenuDrawerOpen.value = !isMenuDrawerOpen.value;
}

function logout() {
  store.commit.crossTab(
    logoutAction({ accessToken: store.state.auth.user.accessToken || "" })
  );
}
</script>
