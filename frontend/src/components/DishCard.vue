<template>
  <q-card class="">
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

    <!-- TODO: display - 0 + (buttons and count, add to DRAFT order) -->
  </q-card>
</template>

<script setup lang="ts">
import { loadDishesAction } from "donut-shared/src/actions/dishes";
import { formatCurrency } from "../lib/format-currency";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number];
}>();
</script>
