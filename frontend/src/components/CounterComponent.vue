<template>
  <div class="row items-center gap-sm">
    <q-btn
      padding="xs"
      color="primary"
      outline
      icon="remove"
      :disable="count === 0"
      @click="emit('decrement')"
    />
    <div class="text-weight-bold">
      {{ count }}
    </div>
    <q-btn padding="xs" color="primary" icon="add" @click="emit('increment')" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ count: number }>();

const emit = defineEmits<{
  increment: [];
  decrement: [];
}>();
</script>
