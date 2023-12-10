<template>
  <div class="row no-wrap gap-md q-py-md">
    <q-img
      :src="dish.imageUrl"
      alt=""
      fit="cover"
      class="image-sm-md shadow-3 rounded-borders"
    />
    <div class="flex-grow">
      <div class="q-mb-sm">
        <span class="text-h6">
          {{ dish.name }}
        </span>
        <span class=""> ({{ count }} x {{ formatCurrency(dish.price) }}) </span>
      </div>
      <div>
        <div
          v-for="modification of modifications"
          :key="modification.modification.id"
          class="q-mb-xs"
        >
          <div class="text-body2">
            <span class="">
              {{ modification.modification.name }}
            </span>
            <span class="">
              ({{ modification.count }} x
              {{ formatCurrency(modification.modification.price) }})
            </span>
          </div>
        </div>
        <div class="q-mt-md row no-wrap justify-between">
          <div>
            <product-counter :count="count"> </product-counter>
          </div>
          <div class="text-primary text-h5">
            {{ formatCurrency(total) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCounter from "src/components/ProductCounter.vue";
import { formatCurrency } from "src/lib/format-currency";
import { computed } from "vue";
import { loadModificationsAction } from "../../../shared";
import { loadDishesAction } from "../../../shared/src/actions/dishes";

const props = defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number];
  count: number;
  modifications: {
    modification: ReturnType<
      typeof loadModificationsAction
    >["payload"]["modifications"][number];
    count: number;
  }[];
}>();

const total = computed(
  () =>
    props.dish.price * props.count +
    props.modifications.reduce(
      (sum, cur) => sum + cur.modification.price * cur.count,
      0
    )
);
</script>
