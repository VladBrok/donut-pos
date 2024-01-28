<template>
  <div class="text-dark-ligher text-caption">
    {{ formatDateTime(time) }}
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from "src/lib/date";

defineProps<{
  time: string;
}>();
</script>
