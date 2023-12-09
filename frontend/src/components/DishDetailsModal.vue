<template>
  <q-dialog>
    <q-card class="dialog-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <div v-if="dish" class="row scroll modal-restricted-height">
        <div
          class="col-12 col-sm-6"
          :class="{ 'q-mx-auto': !dish.modifications.length }"
        >
          <DishCard :dish="dish" expanded> </DishCard>
        </div>
        <q-card-section
          v-if="dish.modifications.length"
          class="col-12 col-sm-6"
        >
          <div class="text-weight-bold text-h5">
            {{ t.modificationsTitle }}:
          </div>
          <div class="q-mt-sm row gap-md">
            <modification-card
              v-for="modification of dish.modifications"
              :key="modification.id"
              :modification="modification"
              class="col-4"
            >
            </modification-card>
          </div>
        </q-card-section>
      </div>

      <q-separator />
      <q-card-section class="row">
        <q-space />
        <q-btn color="primary" v-close-popup>
          {{ t.addToOrderButton }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { loadDishesAction } from "../../../shared/src/actions/dishes";
import { useI18nStore } from "../lib/i18n";
import DishCard from "./DishCard.vue";
import ModificationCard from "./ModificationCard.vue";

defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number] | null;
}>();

const t = useI18nStore();
</script>
