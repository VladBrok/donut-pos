<template>
  <p class="text-body1 text-center q-mx-auto">{{ t.noDataFound }}</p>
</template>

<script setup lang="ts">
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();
</script>
