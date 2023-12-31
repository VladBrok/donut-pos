<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event?.toString() || '')"
    stack-label
    :label="`${t.email} *`"
    lazy-rules
    type="email"
    :rules="[(val) => (val && val.length > 0) || t.emailRequired]"
  />
</template>

<script setup lang="ts">
import { useI18nStore } from "../lib/i18n";

const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  "update:modelValue": [modelValue: string];
}>();

const t = useI18nStore();
</script>
