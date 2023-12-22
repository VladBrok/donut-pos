<template>
  <product-card
    :no-shadow="expanded"
    :image-url="dish.imageUrl"
    :price="dish.price"
    :weight="dish.weight"
    :name="dish.name"
    :caption="dish.isActive ? undefined : t.outOfStock"
  >
    <q-card-section v-if="!expanded" class="q-mt-auto row justify-end">
      <q-btn
        v-if="dish.isActive"
        color="primary"
        icon-right="shopping_basket"
        padding="0 sm"
        @click="emit('addClick')"
      >
        <span class="text-h5 q-pr-sm">+</span>
        <q-tooltip>
          {{ t.addToCurrentOrder }}
        </q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section v-if="expanded && dish.description">
      <div class="text-body1" v-html="sanitizeHtml(dish.description)"></div>
    </q-card-section>
  </product-card>
</template>

<script setup lang="ts">
import { loadDishesAction } from "donut-shared/src/actions/dishes";
import { useI18nStore } from "../lib/i18n";
import { sanitizeHtml } from "../lib/sanitize-html";
import ProductCard from "./ProductCard.vue";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number];
  expanded?: boolean;
}>();

const emit = defineEmits(["addClick"]);

const t = useI18nStore();
</script>
