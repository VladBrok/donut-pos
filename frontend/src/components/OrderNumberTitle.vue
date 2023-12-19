<template>
  <span>
    {{ `${t.order} #${orderNumber}` }}
  </span>
</template>

<script setup lang="ts">
import { useI18nStore } from "src/lib/i18n";

defineProps<{
  orderNumber: string;
}>();

const t = useI18nStore();
</script>
