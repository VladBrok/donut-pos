<template>
  <q-input
    stack-label
    :label="`${t.passwordLabel} *`"
    :type="isHidePassword ? 'password' : 'text'"
    :hint="shouldValidateFormat ? t.passwordHint : undefined"
    lazy-rules
    :rules="[
      (val) => (val && val.length > 0) || t.passwordRequired,
      (val) =>
        !shouldValidateFormat ||
        /[0-9]/.test(val) ||
        t.passwordShouldContainDigit,
      (val) =>
        !shouldValidateFormat ||
        /[A-Z]/.test(val) ||
        t.passwordShouldContainUppercase,
      (val) =>
        !shouldValidateFormat ||
        /[a-z]/.test(val) ||
        t.passwordShouldContainLowercase,
      (val) =>
        !shouldValidateFormat ||
        PASSWORD_SPECIAL_CHARS.split(' ').some((x) => val.includes(x)) ||
        t.passwordShouldContainSpecial,
      (val) =>
        !shouldValidateFormat ||
        val.length >= PASSWORD_MIN_LENGTH ||
        t.minLength({ min: PASSWORD_MIN_LENGTH }),
    ]"
  >
    <template v-slot:append>
      <q-btn
        :aria-label="isHidePassword ? t.showPassword : t.hidePassword"
        :icon="isHidePassword ? 'visibility_off' : 'visibility'"
        @click="isHidePassword = !isHidePassword"
        flat
        dense
      >
      </q-btn>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPECIAL_CHARS,
} from "donut-shared/src/constants";
import { ref } from "vue";
import { useI18nStore } from "../lib/i18n";

defineProps<{ shouldValidateFormat: boolean }>();

const t = useI18nStore();
const isHidePassword = ref(true);
</script>
