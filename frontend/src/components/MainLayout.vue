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
          @click="toggleOrderDrawer"
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
          <!-- <q-btn
            dense
            flat
            round
            icon="menu"
            @click="toggleDrawer"
            class="q-mb-md"
          /> -->
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

    <q-drawer
      v-model="isOrderDrawerOpen"
      side="right"
      bordered
      :width="$q.screen.xs ? 300 : 400"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <q-btn
            dense
            flat
            round
            icon="close"
            @click="toggleOrderDrawer"
            class="q-mb-md"
          />
          <div class="q-px-sm">
            <div class="q-mb-lg">
              <p class="text-h5">
                {{ t.currentOrder }}
              </p>
              <q-separator />
            </div>
            <current-order-view> </current-order-view>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding class="q-pt-xl q-pb-xl">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { logoutAction } from "donut-shared/src/actions/auth";
import { computed, ref } from "vue";
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
const isOrderDrawerOpen = ref(false);
const t = useI18nStore();
const store = useStore();
const isWaiter = computed(
  () => store.state.auth.user.role?.codeName === "waiter"
);
const currentOrder = computed(() => store.state.currentOrder.order);

function toggleMenuDrawer() {
  isMenuDrawerOpen.value = !isMenuDrawerOpen.value;
}

function toggleOrderDrawer() {
  isOrderDrawerOpen.value = !isOrderDrawerOpen.value;
}

function logout() {
  store.commit.crossTab(
    logoutAction({ accessToken: store.state.auth.user.accessToken || "" })
  );
}
</script>
