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
    <common-tooltip>
      {{ t.goBack }}
    </common-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import CommonTooltip from "src/components/CommonTooltip.vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();
</script>
