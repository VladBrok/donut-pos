<template>
  <div class="row no-wrap gap-md q-px-xs q-py-md">
    <q-img
      :src="dish.imageUrl"
      alt=""
      fit="cover"
      class="image-sm-md shadow-3 rounded-borders"
    />
    <div class="flex-grow">
      <div class="row no-wrap items-baseline justify-between">
        <div>
          <span class="text-h6 q-pr-sm">
            {{ dish.name }}
          </span>
          <span> ({{ count }} x {{ formatCurrency(dish.price) }}) </span>
        </div>
        <div>
          <q-btn
            color="negative"
            dense
            flat
            round
            icon="close"
            @click="emit('delete')"
          />
        </div>
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
            <product-counter
              @increment="emit('increment')"
              @decrement="decrementDish"
              :min="1"
              :count="count"
            >
            </product-counter>
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

const emit = defineEmits(["delete", "increment"]);

const total = computed(
  () =>
    (props.dish.price +
      props.modifications.reduce(
        (sum, cur) => sum + cur.modification.price * cur.count,
        0
      )) *
    props.count
);
</script>
