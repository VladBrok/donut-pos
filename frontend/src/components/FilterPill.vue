<template>
  <q-btn
    :color="isSelected && !customColor ? 'primary' : customColor || 'dark-gray'"
    :unelevated="isSelected"
    :outline="!isSelected"
    :class="{
      'bg-white': !isSelected,
    }"
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
  customColor?: string;
}>();

const isSelected = computed(() => props.id === props.selectedId);
</script>
