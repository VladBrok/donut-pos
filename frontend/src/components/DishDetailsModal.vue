<template>
  <q-dialog>
    <q-card class="dialog-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <div v-if="dish" class="row no-wrap scroll modal-restricted-height">
        <div class="flex-basis-50">
          <DishCard :dish="dish" expanded> </DishCard>
        </div>
        <q-card-section class="flex-basis-50">
          <div class="text-weight-bold text-h5">
            {{ formatWeightGram(dish.weight) }}
          </div>
          <div class="q-mt-sm">modifications...</div>
        </q-card-section>
      </div>

      <q-separator />
      <q-card-section class="row">
        <q-space />
        <q-btn color="primary">
          {{ t.addToOrderButton }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { loadDishesAction } from "../../../shared/src/actions/dishes";
import { formatWeightGram } from "../lib/format-weight-gram";
import { useI18nStore } from "../lib/i18n";
import DishCard from "./DishCard.vue";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number] | null;
}>();

const t = useI18nStore();
</script>
