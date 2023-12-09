<template>
  <product-card
    :image-url="modification.imageUrl"
    :price="modification.price"
    :name="modification.name"
  >
    <q-card-section class="q-mt-auto row justify-end">
      <product-counter :count="0"></product-counter>
    </q-card-section>
  </product-card>
</template>

<script setup lang="ts">
import { loadModificationsAction } from "../../../shared";
import ProductCard from "./ProductCard.vue";
import ProductCounter from "./ProductCounter.vue";

defineProps<{
  modification: ReturnType<
    typeof loadModificationsAction
  >["payload"]["modifications"][number];
}>();
</script>
