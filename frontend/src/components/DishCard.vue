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
      <q-card-section class="q-mt-auto">
        <counter-component
          :count="count"
          @increment="count++"
          @decrement="count--"
        ></counter-component>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { loadDishesAction } from "donut-shared/src/actions/dishes";
import { ref } from "vue";
import { formatCurrency } from "../lib/format-currency";
import CounterComponent from "./CounterComponent.vue";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number];
}>();

const count = ref(0);
</script>
