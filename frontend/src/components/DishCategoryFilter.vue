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
        :src="category.imageUrl"
        alt=""
        class="image-xs fit-cover rounded-borders"
      />
      <span>{{ category.name }}</span>
    </span>
  </q-btn>
</template>

<script setup lang="ts">
import { loadDishCategoriesAction } from "donut-shared/src/actions/dish-categories";
import { computed } from "vue";

const props = defineProps<{
  category: ReturnType<
    typeof loadDishCategoriesAction
  >["payload"]["categories"][number];
  selectedCategoryId: string;
}>();

const isSelected = computed(
  () => props.category.id === props.selectedCategoryId
);
</script>
