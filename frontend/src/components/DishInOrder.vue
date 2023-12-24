<template>
  <div class="row no-wrap gap-md q-py-md">
    <component
      :is="forKitchen ? QBtn : 'div'"
      @click="forKitchen && expand()"
      dense
      unelevated
      class="rounded-borders q-pa-none"
    >
      <q-img
        :src="dish.imageUrl"
        alt=""
        fit="cover"
        class="image-sm-md shadow-3 rounded-borders no-shrink"
      >
        <div
          v-if="!dish.isActive"
          class="absolute-full text-body1 flex flex-center no-text-transform"
        >
          {{ capitalize(t.outOfStock) }}
        </div>
      </q-img>
    </component>
    <div class="flex-grow">
      <div class="row no-wrap items-baseline justify-between">
        <div>
          <span class="text-h6 q-pr-sm">
            {{ dish.name }}
          </span>
          <span v-if="forKitchen && count > 1" class="text-h6 text-dark-gray">
            (x {{ count }})
          </span>
          <span v-else-if="!forKitchen" class="text-dark-gray">
            ({{ count }} x {{ formatCurrency(dish.price) }})
          </span>
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
        <div v-if="forKitchen">
          <q-btn
            dense
            flat
            round
            size="sm"
            icon="open_in_new"
            color="dark-gray"
            @click="expand"
          >
            <q-tooltip>{{ t.viewDetails }}</q-tooltip>
          </q-btn>
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
            <span v-if="forKitchen"> (x {{ modification.count }}) </span>
            <span v-else-if="!forKitchen">
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
          <div v-if="forKitchen && order && dishInOrder">
            <dish-in-order-status-button
              :order="order"
              :dish-in-order="dishInOrder"
            >
            </dish-in-order-status-button>
          </div>
          <div v-if="totalCost" class="text-primary text-h5 q-pr-sm">
            {{ formatCurrency(totalCost) }}
          </div>
        </div>
      </div>
    </div>

    <dish-details-modal
      :dish="dishInOrder"
      v-model="isModalOpen"
      view-only
      :count="count"
    >
    </dish-details-modal>
  </div>
</template>

<script setup lang="ts">
import { IOrder } from "donut-shared/src/actions/orders";
import { QBtn } from "quasar";
import DishDetailsModal from "src/components/DishDetailsModal.vue";
import DishInOrderStatusButton from "src/components/DishInOrderStatusButton.vue";
import ProductCounter from "src/components/ProductCounter.vue";
import { capitalize } from "src/lib/capitalize";
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "src/lib/i18n";
import { ref } from "vue";
import { loadModificationsAction } from "../../../shared";
import { loadDishesAction } from "../../../shared/src/actions/dishes";

// TODO: split this component, restructure it, because we should not have "dish" and "dishInOrder" at the same time
defineProps<{
  dish: Pick<
    ReturnType<typeof loadDishesAction>["payload"]["dishes"][number],
    "imageUrl" | "name" | "price" | "isActive"
  >;
  dishInOrder?: IOrder["dishes"][number];
  order?: IOrder;
  viewOnly?: boolean;
  forKitchen?: boolean;
  totalCost?: number;
  count: number;
  modifications: {
    modification: ReturnType<
      typeof loadModificationsAction
    >["payload"]["modifications"][number];
    count: number;
  }[];
}>();

const emit = defineEmits(["delete", "increment", "decrement"]);
const t = useI18nStore();
const isModalOpen = ref(false);

function expand() {
  isModalOpen.value = true;
}
</script>
