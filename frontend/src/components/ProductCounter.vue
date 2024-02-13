<template>
  <div class="row items-center gap-sm">
    <q-btn
      v-if="!viewOnly"
      padding="xs"
      color="primary"
      outline
      icon="remove"
      :disable="count === (min || 0) || disable"
      @click="emit('decrement')"
      :title="t.decrement"
    />
    <div class="text-weight-bold">
      <span v-if="viewOnly">x</span> {{ count }}
    </div>
    <q-btn
      v-if="!viewOnly"
      padding="xs"
      color="primary"
      icon="add"
      @click="emit('increment')"
      :disable="disable"
      :title="t.increment"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18nStore } from "src/lib/i18n";

defineProps<{
  count: number;
  min?: number;
  disable?: boolean;
  viewOnly?: boolean;
}>();

const emit = defineEmits<{
  increment: [];
  decrement: [];
}>();

const t = useI18nStore();
</script>
