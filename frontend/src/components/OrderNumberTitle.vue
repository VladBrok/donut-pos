<template>
  <span class="row items-center gap-xs">
    <span>{{ `${t.order} #${orderNumber}` }}</span>
    <copy-button
      :text="orderNumber"
      :tooltip="t.copyOrderNumber"
      :size="copyButtonSize || 'md'"
    />
  </span>
</template>

<script setup lang="ts">
import CopyButton from "src/components/CopyButton.vue";
import { useI18nStore } from "src/lib/i18n";

defineProps<{
  orderNumber: string;
  copyButtonSize?: "sm" | "md";
}>();

const t = useI18nStore();
</script>
