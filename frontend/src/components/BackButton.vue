<template>
  <q-btn
    class="q-mb-md"
    flat
    round
    color="primary"
    icon="arrow_back"
    @click="$router.back()"
    :title="t.goBack"
  >
    <q-tooltip>
      {{ t.goBack }}
    </q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();
</script>
