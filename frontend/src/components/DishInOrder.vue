<template>
  <div class="row no-wrap gap-md q-py-md q-px-xs items-center">
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
          <span v-if="hidePrice" class="text-h6 text-dark-gray">
            (x {{ count }})
          </span>
          <span v-else class="text-dark-gray">
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
      <slot name="additonal-info" />
      <div>
        <div
          v-for="modification of modificationsList"
          :key="modification.modification.id"
        >
          <div class="text-body2">
            <span>
              {{ modification.modification.name }}
            </span>
            <span v-if="hidePrice"> (x {{ modification.count }}) </span>
            <span v-else>
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
          <slot name="actions" />
          <div v-if="totalCost" class="text-primary text-h5 q-pr-sm">
            {{ formatCurrency(totalCost) }}
          </div>
        </div>
      </div>
    </div>

    <slot
      name="modal"
      :modal-open="isModalOpen"
      :update-model-open="(val: boolean) => (isModalOpen = val)"
    />
  </div>
</template>

<script setup lang="ts">
import { QBtn } from "quasar";
import ProductCounter from "src/components/ProductCounter.vue";
import { capitalize } from "src/lib/capitalize";
import { formatCurrency } from "src/lib/currency";
import { useI18nStore } from "src/lib/i18n";
import { computed, ref } from "vue";
import { loadModificationsAction } from "../../../shared";
import { loadDishesAction } from "../../../shared/src/actions/dishes";

const props = defineProps<{
  dish: Pick<
    ReturnType<typeof loadDishesAction>["payload"]["dishes"][number],
    "imageUrl" | "name" | "price" | "isActive"
  >;
  viewOnly?: boolean;
  forKitchen?: boolean;
  hidePrice?: boolean;
  totalCost?: number;
  count: number;
  modifications?: {
    modification: ReturnType<
      typeof loadModificationsAction
    >["payload"]["modifications"][number];
    count: number;
  }[];
}>();

const emit = defineEmits(["delete", "increment", "decrement"]);
const t = useI18nStore();
const isModalOpen = ref(false);
const modificationsList = computed(() => props.modifications || []);

function expand() {
  isModalOpen.value = true;
}
</script>
