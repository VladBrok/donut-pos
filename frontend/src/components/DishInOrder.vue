<template>
  <div class="row no-wrap gap-md q-py-md">
    <q-img
      :src="dish.imageUrl"
      alt=""
      fit="cover"
      class="image-sm-md shadow-3 rounded-borders no-shrink"
    >
      <div
        v-if="!dish.isActive && !viewOnly"
        class="absolute-full text-body1 flex flex-center"
      >
        {{ t.outOfStock }}
      </div>
    </q-img>
    <div class="flex-grow">
      <div class="row no-wrap items-baseline justify-between">
        <div>
          <span class="text-h6 q-pr-sm">
            {{ dish.name }}
          </span>
          <span> ({{ count }} x {{ formatCurrency(dish.price) }}) </span>
        </div>
        <div v-if="!viewOnly">
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
        <div class="q-mt-md row gap-sm justify-between">
          <div v-if="!viewOnly">
            <product-counter
              @increment="emit('increment')"
              @decrement="emit('decrement')"
              :min="1"
              :count="count"
              :disable="!dish.isActive"
            >
            </product-counter>
          </div>
          <div class="text-primary text-h5 q-pr-sm">
            {{ formatCurrency(totalCost) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCounter from "src/components/ProductCounter.vue";
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "src/lib/i18n";
import { loadModificationsAction } from "../../../shared";
import { loadDishesAction } from "../../../shared/src/actions/dishes";

defineProps<{
  dish: Pick<
    ReturnType<typeof loadDishesAction>["payload"]["dishes"][number],
    "imageUrl" | "name" | "price" | "isActive"
  >;
  viewOnly?: boolean;
  count: number;
  totalCost: number;
  modifications: {
    modification: ReturnType<
      typeof loadModificationsAction
    >["payload"]["modifications"][number];
    count: number;
  }[];
}>();

const t = useI18nStore();
const emit = defineEmits(["delete", "increment", "decrement"]);
</script>
