<template>
  <q-btn
    class="q-mr-xs"
    flat
    round
    icon="o_notifications"
    :title="t.showNotifications"
  >
    <common-tooltip> {{ t.showNotifications }} </common-tooltip>
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
    <q-menu fit class="notification-bell-menu" role="">
      <div class="q-px-xs" style="min-width: 300px">
        <TransitionGroup tag="div" name="fade" style="min-width: 300px">
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
import CommonTooltip from "src/components/CommonTooltip.vue";
import NoData from "src/components/NoData.vue";
import { useI18nStore } from "../lib/i18n";

defineProps<{
  isLoading: boolean;
  notificationCount: number;
}>();

const t = useI18nStore();
</script>
