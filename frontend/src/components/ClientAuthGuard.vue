<template>
  <q-card v-if="!isLoggedIn" class="q-pa-lg w-fit q-mx-auto">
    <p class="text-h5 text-center q-mb-xl">
      Log In or Sign Up to <slot name="text" />
    </p>
    <div class="column justify-center max-w-micro q-mx-auto">
      <q-btn :label="t.logIn" color="primary" to="/login" class="q-mb-md" />
      <q-btn :label="t.signUp" color="primary" to="/sign-up" />
    </div>
  </q-card>
  <slot v-else name="content" />
</template>

<script setup lang="ts">
// TODO: after login or signup, redirect to needed page
import { ANONYMOUS } from "donut-shared";
import { useI18nStore } from "src/lib/i18n";
import { useStore } from "src/store";
import { computed } from "vue";

const t = useI18nStore();
const store = useStore();
const isLoggedIn = computed(
  () => store.state.auth.user.userId !== ANONYMOUS.userId
);
</script>
