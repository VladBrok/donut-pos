<template>
  <q-card>
    <div class="column no-wrap full-height">
      <q-card-section>
        <q-img
          :src="dish.imageUrl"
          alt=""
          fit="cover"
          class="image-card shadow-3 rounded-borders"
        />
      </q-card-section>
      <q-card-section class="row justify-between">
        <div class="text-h6 q-mr-sm">{{ dish.name }}</div>
        <div class="text-h6 text-primary">{{ formatCurrency(dish.price) }}</div>
      </q-card-section>
      <q-card-section class="q-mt-auto row justify-end">
        <q-btn color="primary" icon-right="shopping_basket" padding="0 sm">
          <span class="text-h5 q-pr-sm">+</span>
          <q-tooltip>
            {{ t.addToCurrentOrder }}
          </q-tooltip>
        </q-btn>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { loadDishesAction } from "donut-shared/src/actions/dishes";
import { formatCurrency } from "../lib/format-currency";
import { useI18nStore } from "../lib/i18n";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number];
}>();

const t = useI18nStore();
</script>
