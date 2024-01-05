<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <q-page-sticky position="top" expand style="z-index: 10">
        <div class="bg-gray-lightest q-py-md q-px-md w-100">
          <q-input
            class="bg-white max-w-sm rounded-borders"
            outlined
            v-model="searchInput"
            :placeholder="t.searchDishes"
            clearable
          >
            <template v-slot:append>
              <q-icon v-if="!searchInput?.length" name="search" />
            </template>
          </q-input>
        </div>
      </q-page-sticky>
      <div class="q-mb-lg q-mt-lg gap-sm row">
        <filter-pill
          v-for="category in categories"
          :key="category.id"
          :image-url="category.imageUrl"
          :id="category.id"
          :name="category.name"
          :selected-id="selectedCategoryId"
          @click="handleCategoryFilterClick(category.id)"
        >
        </filter-pill>
      </div>
      <div v-if="dishesFiltered.length" class="q-mx-auto card-grid">
        <dish-card
          v-for="dish in dishesFiltered"
          :dish="dish"
          :key="dish.id"
          @add-click="selectedDish = dish"
        >
        </dish-card>
      </div>
      <div v-else>
        <no-data></no-data>
      </div>
    </div>
  </div>

  <dish-details-modal
    :model-value="Boolean(selectedDish)"
    @update:model-value="selectedDish = null"
    :dish="selectedDish"
  >
  </dish-details-modal>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS, MENU_IMAGE_URL } from "donut-shared";
import BigSpinner from "src/components/BigSpinner.vue";
import DishCard from "src/components/DishCard.vue";
import FilterPill from "src/components/FilterPill.vue";
import NoData from "src/components/NoData.vue";
import { computed, ref } from "vue";

import { loadDishesAction } from "donut-shared/src/actions/dishes";
import DishDetailsModal from "src/components/DishDetailsModal.vue";
import { createFuzzySearcher } from "../lib/fuzzy-search";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";

const store = useStore();
const dishes = computed(() => store.state.dishes.dishes);
const categories = computed(() => [
  {
    id: "all",
    imageUrl: MENU_IMAGE_URL,
    name: t.value.allMenu,
  },
  ...store.state.dishCategories.categories,
]);
const selectedCategoryId = ref("all");
const fuzzySearch = computed(() =>
  createFuzzySearcher(dishes.value, [
    "name",
    "category.name",
    "price",
    "weight",
  ])
);
const dishesFiltered = computed(() =>
  fuzzySearch.value
    .search(searchInput.value || "")
    .filter(
      (x) =>
        selectedCategoryId.value === "all" ||
        x.category?.id === selectedCategoryId.value
    )
);
const channels = computed(() => {
  return [CHANNELS.DISHES, CHANNELS.DISH_CATEGORIES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const searchInput = ref<string | null>(null);
const selectedDish = ref<
  ReturnType<typeof loadDishesAction>["payload"]["dishes"][number] | null
>(null);

const handleCategoryFilterClick = (id: string) => {
  selectedCategoryId.value = id;
};
</script>
