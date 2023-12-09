<template>
  <q-card :class="{ 'shadow-0': expanded }">
    <div class="column no-wrap full-height">
      <q-card-section>
        <q-img
          :src="dish.imageUrl"
          alt=""
          fit="cover"
          class="image-card shadow-3 rounded-borders"
        />
      </q-card-section>
      <div class="row justify-between q-px-md">
        <div class="text-h6 q-mr-sm">{{ dish.name }}</div>
        <div class="text-h6 text-primary">{{ formatCurrency(dish.price) }}</div>
      </div>
      <q-card-section v-if="!expanded" class="q-mt-auto row justify-end">
        <q-btn
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
      <q-card-section v-if="expanded">
        <div v-html="sanitizeHtml(dish.description)"></div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { loadDishesAction } from "donut-shared/src/actions/dishes";
import { formatCurrency } from "../lib/format-currency";
import { useI18nStore } from "../lib/i18n";
import { sanitizeHtml } from "../lib/sanitize-html";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number];
  expanded?: boolean;
}>();

const emit = defineEmits(["addClick"]);

const t = useI18nStore();
</script>
