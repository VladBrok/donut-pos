<template>
  <div ref="containerRef">
    <product-card
      :no-shadow="expanded"
      :image-url="dish.imageUrl"
      :price="hidePrice ? undefined : dish.price"
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
          class="q-mr-md"
          @click="emit('openDetailsClick')"
        >
          <span class="text-h5 q-pr-sm">+</span>
          <q-tooltip>
            {{ t.openDetails }}
          </q-tooltip>
        </q-btn>
        <q-btn
          v-if="dish.isActive"
          color="primary"
          padding="0 sm"
          outline
          @click="emit('addClick', containerRef)"
        >
          <span class="text-h5">+</span>
          <q-tooltip>
            {{ t.addToCurrentOrder }}
          </q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section v-if="expanded && dish.description">
        <div class="text-body1" v-html="sanitizeHtml(dish.description)"></div>
      </q-card-section>
      <template #right>
        <span v-if="count != null"> x {{ count }} </span>
      </template>
    </product-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18nStore } from "../lib/i18n";
import { sanitizeHtml } from "../lib/sanitize-html";
import ProductCard from "./ProductCard.vue";

defineProps<{
  dish: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    weight: number;
    isActive: boolean;
  };
  expanded?: boolean;
  hidePrice?: boolean;
  count?: number;
}>();

const emit = defineEmits(["openDetailsClick", "addClick"]);

const containerRef = ref<HTMLElement>();
const t = useI18nStore();
</script>
