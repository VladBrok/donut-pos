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
      <div class="q-mx-auto w-fit card-grid gap-md">
        <dish-card v-for="dish in dishesFiltered" :dish="dish" :key="dish.id">
        </dish-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import { CHANNELS } from "donut-shared/src/constants";
import { computed, ref } from "vue";
import BigSpinner from "../../components/BigSpinner.vue";
import DishCard from "../../components/DishCard.vue";
import { createFuzzySearcher } from "../../lib/fuzzy-search";
import { useI18nStore } from "../../lib/i18n";
import { useStore } from "../../store";

const store = useStore();
const dishes = computed(() => store.state.dishes.dishes);
const fuzzySearch = computed(() =>
  createFuzzySearcher(dishes.value, [
    "name",
    "category.name",
    "price",
    "weight",
  ])
);
const dishesFiltered = computed(() =>
  fuzzySearch.value.search(searchInput.value)
);
const channels = computed(() => {
  return [CHANNELS.DISHES];
});
let isSubscribing = useSubscription(channels, { store: store as any });
const t = useI18nStore();
const searchInput = ref("");
</script>
