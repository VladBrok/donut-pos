<template>
  <q-btn class="q-mr-sm" flat round icon="o_notifications">
    <q-tooltip> {{ t.showNotifications }} </q-tooltip>
    <q-spinner-rings
      v-if="isLoading"
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
    <q-menu fit style="overflow-x: hidden; min-width: 300px">
      <div class="q-px-xs">
        <TransitionGroup tag="div" name="fade">
          <p v-if="!notificationCount">
            <NoData :key="'empty'" :text="t.noNotifications" class="q-py-lg" />
          </p>
          <slot v-else name="notification-list" />
        </TransitionGroup>
      </div>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import NoData from "src/components/NoData.vue";
import { useI18nStore } from "../lib/i18n";

defineProps<{
  isLoading: boolean;
  notificationCount: number;
}>();

const t = useI18nStore();
</script>
