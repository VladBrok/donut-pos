<template>
  <product-card
    :image-url="modification.imageUrl"
    :price="modification.price"
    :name="modification.name"
    :weight="modification.weight"
    text-size="sm"
  >
    <q-card-section class="q-mt-auto row justify-end">
      <slot />
    </q-card-section>
  </product-card>
</template>

<script setup lang="ts">
import { loadModificationsAction } from "../../../shared";
import ProductCard from "./ProductCard.vue";

defineProps<{
  modification: ReturnType<
    typeof loadModificationsAction
  >["payload"]["modifications"][number];
}>();
</script>
