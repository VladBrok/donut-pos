<template>
  <q-dialog :transition-hide="transitionHide">
    <q-card class="dialog-md">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <div
        v-if="dish"
        class="row scroll restricted-height-modal"
        ref="dishContainerRef"
      >
        <div
          class="col-12 col-sm-6"
          :class="{ 'q-mx-auto': !dish.modifications.length }"
        >
          <dish-card
            :dish="dish"
            expanded
            :hide-price="viewOnly"
            :count="count"
          >
          </dish-card>
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
              <modification-card
                :modification="modification"
                :hide-price="viewOnly"
              >
                <product-counter
                  :view-only="viewOnly"
                  :count="modificationCounts.get(modification.id) || 0"
                  @increment="incrementModification(modification.id)"
                  @decrement="decrementModification(modification.id)"
                ></product-counter>
              </modification-card>
            </div>
          </div>
        </q-card-section>
      </div>

      <template v-if="!viewOnly">
        <q-separator />
        <q-card-section class="row">
          <q-space />
          <q-btn color="primary" v-close-popup @click="addToOrder">
            {{ t.addToOrderButton }}
          </q-btn>
        </q-card-section>
      </template>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { assert, loadModificationsAction } from "donut-shared";
import { IDishInOrder } from "donut-shared/src/actions/orders";
import { addDishToCurrentOrder } from "src/lib/add-dish-to-current-order";
import { generateRandomId } from "src/lib/generate-random-id";
import { computed, ref, watch } from "vue";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import DishCard from "./DishCard.vue";
import ModificationCard from "./ModificationCard.vue";
import ProductCounter from "./ProductCounter.vue";

const props = defineProps<{
  dish: {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    weight: number;
    isActive: boolean;
    modifications: (ReturnType<
      typeof loadModificationsAction
    >["payload"]["modifications"][number] & { count?: number })[];
  } | null;
  viewOnly?: boolean;
  count?: number;
}>();
const dish = computed(() => props.dish);
const t = useI18nStore();
const store = useStore();
const modificationCounts = ref(new Map<string, number>());
const dishContainerRef = ref<HTMLElement>();
const transitionHide = ref<"fade">();

watch(
  dish,
  () => {
    modificationCounts.value.clear();

    dish.value?.modifications.forEach((modification) => {
      modificationCounts.value.set(modification.id, modification?.count || 0);
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
  transitionHide.value = "fade";
  setTimeout(() => {
    transitionHide.value = undefined;
  }, 300);
  const dishInOrder: IDishInOrder = {
    cookedDate: "",
    cookingDate: "",
    deliveredDate: "",
    status: "",
    count: 1,
    dishIdInOrder: generateRandomId(),
    ...dish.value,
    modifications: dish.value.modifications
      .filter((x) => modificationCounts.value.get(x.id))
      .map((x) => ({
        ...x,
        count: modificationCounts.value.get(x.id) || -1,
      })),
  };
  addDishToCurrentOrder(store, dishInOrder, dishContainerRef.value);
}
</script>
