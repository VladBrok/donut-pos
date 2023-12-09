<template>
  <p class="text-body1 text-center q-mx-auto">{{ text }}</p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18nStore } from "../lib/i18n";

const t = useI18nStore();

const props = defineProps<{ text?: string }>();
const text = computed(() => props.text || t.value.noDataFound);
</script>
