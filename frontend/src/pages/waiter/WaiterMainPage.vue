<template>
  <div>
    <big-spinner v-if="isSubscribing" />
    <div v-else>
      <div class="q-mb-lg max-w-sm">
        <q-input
          class="bg-white"
          outlined
          v-model="searchInput"
          :placeholder="t.searchDishes"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="q-mb-lg gap-sm row">
        <dish-category-filter
          v-for="category in categories"
          :category="category"
          :key="category.id"
          :selected-category-id="selectedCategoryId"
          @click="handleCategoryFilterClick(category.id)"
        >
        </dish-category-filter>
      </div>
      <div v-if="dishesFiltered.length" class="q-mx-auto w-fit card-grid">
        <dish-card v-for="dish in dishesFiltered" :dish="dish" :key="dish.id">
        </dish-card>
      </div>
      <div v-else>
        <no-data></no-data>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS, MENU_IMAGE_URL } from "donut-shared/src/constants";
import { computed, ref } from "vue";
import BigSpinner from "../../components/BigSpinner.vue";
import DishCard from "../../components/DishCard.vue";
import DishCategoryFilter from "../../components/DishCategoryFilter.vue";
import NoData from "../../components/NoData.vue";

import { createFuzzySearcher } from "../../lib/fuzzy-search";
import { useI18nStore } from "../../lib/i18n";
import { useStore } from "../../store";

// TODO: show "found results" when some filter is active

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
    .search(searchInput.value)
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
const searchInput = ref("");

const handleCategoryFilterClick = (id: string) => {
  selectedCategoryId.value = id;
};
</script>
