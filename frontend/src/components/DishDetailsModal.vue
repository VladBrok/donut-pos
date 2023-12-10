<template>
  <q-dialog>
    <q-card class="dialog-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <div v-if="dish" class="row scroll restricted-height-modal">
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
          <div class="q-mt-sm row">
            <div
              v-for="modification of dish.modifications"
              :key="modification.id"
              class="col-12 col-md-6 q-pa-sm"
            >
              <modification-card :modification="modification">
                <product-counter
                  :count="modificationCounts.get(modification.id) || 0"
                  @increment="incrementModification(modification.id)"
                  @decrement="decrementModification(modification.id)"
                ></product-counter>
              </modification-card>
            </div>
          </div>
        </q-card-section>
      </div>

      <q-separator />
      <q-card-section class="row">
        <q-space />
        <q-btn color="primary" v-close-popup @click="addToOrder">
          {{ t.addToOrderButton }}
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { addDishToCurrentOrderAction, assert } from "donut-shared";
import { computed, ref, watch } from "vue";
import { loadDishesAction } from "../../../shared/src/actions/dishes";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import DishCard from "./DishCard.vue";
import ModificationCard from "./ModificationCard.vue";
import ProductCounter from "./ProductCounter.vue";

const props = defineProps<{
  dish: ReturnType<typeof loadDishesAction>["payload"]["dishes"][number] | null;
}>();
const dish = computed(() => props.dish);

const t = useI18nStore();
const store = useStore();
const modificationCounts = ref(new Map<string, number>());

watch(
  dish,
  () => {
    modificationCounts.value.clear();

    dish.value?.modifications.forEach((modification) => {
      modificationCounts.value.set(modification.id, 0);
    });
  },
  { immediate: true }
);

function decrementModification(id: string) {
  modificationCounts.value.set(id, (modificationCounts.value.get(id) || 0) - 1);
}

function incrementModification(id: string) {
  modificationCounts.value.set(id, (modificationCounts.value.get(id) || 0) + 1);
}

function addToOrder() {
  assert(dish.value, "Expected to have a dish at this point");

  store.commit.crossTab(
    addDishToCurrentOrderAction({
      dish: {
        id: dish.value.id,
        modifications: [...modificationCounts.value.entries()]
          .filter(([, count]) => count > 0)
          .map(([id, count]) => ({
            id: id,
            count: count,
          })),
      },
    })
  );
}
</script>