<template>
  <q-layout view="lHh LpR fFf" class="bg-grey-3">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />
        <q-toolbar-title>
          {{ $route.meta.title || "" }}
        </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click="logout">
          <q-tooltip> {{ t.logout }} </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="isDrawerOpen"
      side="left"
      :width="200"
      bordered
    >
      <q-scroll-area class="fit">
        <!-- TODO: add logo here -->
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
            <q-separator v-if="index !== menuList.length - 1" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding class="q-pt-xl">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { logoutAction } from "donut-shared/src/actions/auth";
import { ref } from "vue";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";

const isDrawerOpen = ref(false);
const t = useI18nStore();
const store = useStore();

const menuList = [
  {
    icon: "o_menu_book",
    label: t.value.dishCategories,
    to: "/admin/dish-categories",
    meta: t.value.dishCategories,
  },
  {
    icon: "o_ramen_dining",
    label: t.value.dishes,
    to: "/admin/dishes",
    meta: t.value.dishes,
  },
  {
    icon: "o_tapas",
    label: t.value.modifications,
    to: "/admin/modifications",
    meta: t.value.modifications,
  },
  {
    icon: "o_person",
    label: t.value.employees,
    to: "/admin/employees",
    meta: t.value.employees,
  },
];

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function logout() {
  store.commit.crossTab(
    logoutAction({ accessToken: store.state.auth.user.accessToken || "" })
  );
}
</script>
