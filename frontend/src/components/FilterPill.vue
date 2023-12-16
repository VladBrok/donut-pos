<template>
  <q-btn
    :color="isSelected ? 'primary' : 'dark-gray'"
    :unelevated="isSelected"
    :outline="!isSelected"
    :class="`${!isSelected ? 'bg-white' : ''}`"
    rounded
    padding="sm md"
  >
    <span class="row justify-between gap-xs items-center">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt=""
        class="image-xs fit-cover rounded-borders"
      />
      <span>{{ name }}</span>
    </span>
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  id: string;
  imageUrl?: string;
  name: string;
  selectedId: string;
}>();

const isSelected = computed(() => props.id === props.selectedId);
</script>
