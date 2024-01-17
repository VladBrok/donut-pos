<template>
  <q-input
    :model-value="value"
    @update:model-value="
      emit('update:modelValue', getModelValueToUpdate($event?.toString() || ''))
    "
    stack-label
    :label="`${t.phoneLabel} *`"
    :hint="
      hint ||
      (shouldValidateFormat ? `${t.phoneExample}: 531 700 505` : undefined)
    "
    lazy-rules
    unmasked-value
    prefix="+48"
    mask="### ### ###"
    type="tel"
    :rules="[
      (val) => (val && val.length > 0) || t.phoneRequired,
      (val) =>
        !shouldValidateFormat || PHONE_REGEX.test(val) || t.invalidPhoneLengths,
    ]"
  />
</template>

<script setup lang="ts">
import { PHONE_REGEX } from "donut-shared";
import { computed } from "vue";
import { useI18nStore } from "../lib/i18n";

const props = defineProps<{
  shouldValidateFormat: boolean;
  modelValue: string;
  hint?: string;
}>();
const emit = defineEmits<{
  "update:modelValue": [modelValue: string];
}>();

const t = useI18nStore();
const value = computed(() =>
  props.modelValue.startsWith("+48")
    ? props.modelValue.slice(3)
    : props.modelValue
);

function getModelValueToUpdate(newValue: string) {
  newValue = newValue.trim();
  newValue = newValue.startsWith("+48") ? newValue : "+48" + newValue;
  return newValue;
}
</script>
