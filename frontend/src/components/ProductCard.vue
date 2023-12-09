<template>
  <q-card :class="{ 'shadow-0': noShadow }">
    <div class="column no-wrap full-height">
      <q-card-section>
        <q-img
          :src="imageUrl"
          alt=""
          fit="cover"
          class="image-card shadow-3 rounded-borders"
        />
      </q-card-section>
      <div class="row justify-between q-px-md">
        <div class="text-h6 q-mr-sm">{{ name }}</div>
        <div class="text-h6 text-primary">{{ formatCurrency(price) }}</div>
      </div>
      <slot />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { formatCurrency } from "../lib/format-currency";

defineProps<{
  price: number;
  name: string;
  imageUrl: string;
  noShadow?: boolean;
}>();
</script>
