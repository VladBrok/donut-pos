<template>
  <span class="row items-center gap-xs">
    <span>
      {{ t.order }}
      <component
        :is="isLink ? RouterLink : 'span'"
        :to="`/orders/${orderNumber}`"
        >{{ `#${orderNumber}` }}</component
      >
    </span>
    <copy-button
      v-if="!isLink"
      :text="orderNumber"
      :tooltip="t.copyOrderNumber"
      :size="copyButtonSize || 'md'"
    />
  </span>
</template>

<script setup lang="ts">
import CopyButton from "src/components/CopyButton.vue";
import { useI18nStore } from "src/lib/i18n";
import { RouterLink } from "vue-router";

defineProps<{
  orderNumber: string;
  copyButtonSize?: "sm" | "md";
  isLink?: boolean;
}>();

const t = useI18nStore();
</script>
