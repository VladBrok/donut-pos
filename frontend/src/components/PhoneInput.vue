<template>
  <q-input
    stack-label
    :label="`${t.phoneLabel} *`"
    :hint="`${t.phoneExample}: +48000110022`"
    lazy-rules
    type="tel"
    :rules="[
      (val) => (val && val.length > 0) || t.phoneRequired,
      (val) =>
        !shouldValidateFormat ||
        val.startsWith('+48') ||
        t.phoneShouldStartWith,
      (val) =>
        !shouldValidateFormat || val.length === 12 || t.invalidPhoneLengths,
    ]"
  />
</template>

<script setup lang="ts">
import { useI18nStore } from "../lib/i18n";

defineProps<{ shouldValidateFormat: boolean }>();

const t = useI18nStore();
</script>
