<template>
  <q-img
    :src="noText ? '/logo-no-text.png' : '/logo-text.png'"
    alt="Donut POS logo"
    fit="cover"
  />
</template>

<script setup lang="ts">
defineProps<{
  noText?: boolean;
}>();
</script>
