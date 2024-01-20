<template>
  <q-form @submit="onSubmit" @validation-error="onFormValidationError">
    <OrderView
      :has-content="Boolean(order)"
      :dish-count="getDishesInOrderCount(order)"
      :total-cost="totalCost"
      custom-empty
    >
      <template #content>
        <big-spinner v-if="isSubscribing" />
        <div v-else>
          <div>
            <!-- TODO: add client autotomplete field -->
            <q-select
              :model-value="
                orderTypes.find((x) => x.value === order?.type) ||
                orderTypeDefault
              "
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderTypeAction({
                    type: $event.value,
                  })
                )
              "
              stack-label
              :options="orderTypes"
              :label="t.orderTypeLabel"
              class="q-mb-md"
            >
              <template v-slot:before>
                <q-icon
                  :name="
                    orderTypes.find(
                      (x) => x.value === (order?.type || orderTypeDefault.value)
                    )?.icon
                  "
                />
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <div v-if="order?.type === 'delivery'" class="q-mb-lg">
              <q-btn
                v-if="!order.address"
                color="primary"
                outline
                @click="isAddAddressModalOpen = true"
              >
                <q-icon name="add_circle" class="q-mr-sm" />
                <span>{{ t.addDeliveryAddress }}</span>
              </q-btn>
              <q-input
                v-else
                :model-value="formatAddress(order.address)"
                readonly
                stack-label
                :label="`${t.deliveryAddress}`"
                type="text"
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    icon="edit"
                    @click="isAddAddressModalOpen = true"
                  >
                    <q-tooltip>
                      {{ t.changeDeliveryAddress }}
                    </q-tooltip>
                  </q-btn>
                </template>
              </q-input>
            </div>
            <q-select
              v-if="order?.type === 'dine-in'"
              :model-value="order?.table?.number"
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderTableNumberAction({
                    table:
                      diningTables.find((x) => x.number === $event?.trim()) ||
                      null,
                  })
                )
              "
              use-input
              fill-input
              stack-label
              clearable
              hide-selected
              input-debounce="0"
              :disable="!!route.query.table && !!order?.table?.number"
              :options="filteredTableNames"
              @filter="filterTables"
              :label="`${t.tableNumberLabel} *`"
              :rules="[(val) => (!!val && val.length > 0) || t.fieldRequired]"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section>
                    {{ t.noResults }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              :model-value="order?.comment"
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderCommentAction({
                    comment: $event?.toString() || '',
                  })
                )
              "
              stack-label
              :label="`${t.commentLabel}`"
              lazy-rules
              type="textarea"
              rows="1"
              autogrow
              :rules="[
                (val) =>
                  !val ||
                  val.length <= COMMENT_MAX_LENGTH ||
                  t.maxLength({ max: COMMENT_MAX_LENGTH }),
              ]"
            />
          </div>

          <div>
            <div v-for="data of dishesInOrder" :key="data.dish.dishIdInOrder">
              <dish-in-order
                :dish="data.dish"
                :count="data.count"
                :total-cost="data.totalCost"
                :modifications="
                  data.modifications.map((x) => ({
                    count: x.count,
                    modification: x,
                  }))
                "
                @delete="
                  store.commit.crossTab(
                    removeDishFromCurrentOrderAction({
                      dishIdInOrder: data.dish.dishIdInOrder,
                    })
                  )
                "
                @increment="
                  store.commit.crossTab(
                    addDishToCurrentOrderAction({
                      dish: data.dish,
                    })
                  )
                "
                @decrement="
                  store.commit.crossTab(
                    decrementDishInCurrentOrderAction({
                      dish: {
                        id: data.dish.id,
                        modifications: data.dish.modifications,
                      },
                    })
                  )
                "
              />
              <q-separator />
            </div>
          </div>
        </div>
      </template>
      <template #options>
        <div class="row justify-end q-gutter-sm">
          <q-btn
            color="negative"
            flat
            @click="isConfirmClearOpen = true"
            type="button"
          >
            {{ t.clearOrder }}
          </q-btn>
          <q-btn
            color="primary"
            type="submit"
            :loading="isSubmitting"
            :disable="hasDishOutOfStock || requiredAddressNotSpecified"
          >
            {{ t.createOrder }}
            <q-tooltip
              v-if="hasDishOutOfStock || requiredAddressNotSpecified"
              class="bg-negative text-white text-body1"
              max-width="200px"
            >
              {{
                hasDishOutOfStock
                  ? t.cannotCreateOrderWithOutOfStock
                  : t.specifyDeliveryAddress
              }}
            </q-tooltip>
          </q-btn>
        </div>
      </template>
      <template #empty>
        <div class="q-mt-xl">
          <div v-if="previousOrder" class="column justify-center items-center">
            <q-img
              src="/src/assets/cart.svg"
              alt=""
              fit="cover"
              class="image-md"
            />
            <p class="text-h6">{{ t.orderWasCreated }}!</p>
            <RouterLink
              class="text-body1 q-mt-sm"
              :to="`/orders/${previousOrder.orderNumber}`"
            >
              {{ t.viewOrder }}
            </RouterLink>
          </div>
          <no-data v-else :text="t.emptyOrder" />
        </div>
      </template>
    </OrderView>
  </q-form>

  <confirm-dialog v-model="isConfirmClearOpen">
    <template #body> {{ t.confirmCurrentOrderClear }}? </template>
    <template #confirmButton>
      <q-btn flat :label="t.clearOrder" color="negative" @click="clear" />
    </template>
  </confirm-dialog>

  <add-address-modal
    v-if="isAddAddressModalOpen"
    v-model="isAddAddressModalOpen"
    @submit="
      (isAddAddressModalOpen = false),
        store.commit.crossTab(
          updateCurrentOrderAddressAction({
            address: $event,
          })
        )
    "
  >
  </add-address-modal>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  ANONYMOUS,
  CHANNELS,
  COMMENT_MAX_LENGTH,
  ORDER_TYPES_ARR,
  addDishToCurrentOrderAction,
  clearCurrentOrderAction,
  decrementDishInCurrentOrderAction,
  getDishesInOrderCount,
  getOrderDishTotalCost,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import {
  updateCurrentOrderAddressAction,
  updateCurrentOrderTypeAction,
  updatePreviousOrderAction,
} from "donut-shared/src/actions/current-order";
import { updateCreateOrderAfterAuthAction } from "donut-shared/src/actions/orders";
import AddAddressModal from "src/components/AddAddressModal.vue";
import BigSpinner from "src/components/BigSpinner.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import OrderView from "src/components/OrderView.vue";
import { formatAddress } from "src/lib/address";
import { useIsLoggedIn } from "src/lib/composables/useIsLoggedIn";
import { AUTH_BEFORE_ORDER_CREATE } from "src/lib/constants";
import { createOrder } from "src/lib/create-order";
import { createFuzzySearcher } from "src/lib/fuzzy-search";
import { getOrderTypeIcon } from "src/lib/get-order-type-icon";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18nStore } from "../lib/i18n";
import { useStore } from "../store";
import ConfirmDialog from "./ConfirmDialog.vue";
import NoData from "./NoData.vue";

const store = useStore();
const order = computed(() => store.state.currentOrder.order);
const t = useI18nStore();
const isConfirmClearOpen = ref(false);
const isSubmitting = ref(false);
const userId = ref(store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? [CHANNELS.DINING_TABLES]
    : [CHANNELS.DINING_TABLES, CHANNELS.ADDRESSES];
});
const tableNumberSearchInput = ref("");
const tableNumberFuzzySearch = computed(() =>
  createFuzzySearcher(store.state.diningTables.tables, ["number"])
);
const filteredTableNames = computed(() =>
  tableNumberFuzzySearch.value
    .search(tableNumberSearchInput.value)
    .map((x) => x.number)
);
const isSubscribing = useSubscription(channels, { store: store as any });
const diningTables = computed(() => store.state.diningTables.tables);
const previousOrder = computed(() => store.state.currentOrder.previous);
const addresses = computed(() => store.state.addresses.addresses);
const dishesInOrder = computed(() =>
  isSubscribing.value
    ? []
    : order.value?.dishes.map((dish) => {
        return {
          dish: dish,
          count: dish.count,
          modifications: dish.modifications,
          totalCost: getOrderDishTotalCost({
            count: dish.count,
            price: dish.price,
            modifications: dish.modifications.map((x) => ({
              count: x.count,
              price: x.price,
            })),
          }),
        };
      })
);
const hasDishOutOfStock = computed(
  () => dishesInOrder.value?.some((x) => !x.dish.isActive) || false
);
const totalCost = computed(
  () => dishesInOrder.value?.reduce((sum, cur) => sum + cur.totalCost, 0) || 0
);
const isAddAddressModalOpen = ref(false);
const route = useRoute();
const orderTypes = computed(() =>
  ORDER_TYPES_ARR.map((x) => ({
    label: t.value[`orderType_${x}`],
    value: x,
    icon: getOrderTypeIcon(x),
  }))
);
const orderTypeDefault = ref<(typeof orderTypes.value)[number]>(
  route.query.table
    ? orderTypes.value.find((x) => x.value === "dine-in")!
    : orderTypes.value.find((x) => x.value === "takeout")!
);
const router = useRouter();
const isLoggedIn = useIsLoggedIn();
const requiredAddressNotSpecified = computed(
  () => order.value?.type === "delivery" && !order.value.address
);

const unsubscribe = watch(
  isSubscribing,
  () => {
    if (isSubscribing.value) {
      return;
    }

    if (route.query.table) {
      store.commit.crossTab(
        updateCurrentOrderTableNumberAction({
          table:
            diningTables.value.find(
              (x) => x.number === route.query.table?.toString()?.trim()
            ) || null,
        })
      );
    }

    unsubscribe();
  },
  { immediate: true }
);

watch(
  order,
  (newOrder, oldOrder) => {
    if (newOrder && !oldOrder) {
      store.commit.crossTab(
        updatePreviousOrderAction({
          order: undefined,
        })
      );
    }
  },
  { immediate: true }
);

const filterTables = (val: string, update: any) => {
  update(() => {
    tableNumberSearchInput.value = val;
  });
};

function clear() {
  store.commit.crossTab(clearCurrentOrderAction());
  isConfirmClearOpen.value = false;
}

async function onSubmit() {
  if (!isLoggedIn.value) {
    store.commit.crossTab(
      updateCreateOrderAfterAuthAction({
        value: true,
      })
    );
    router.push(`/sign-up?text=${AUTH_BEFORE_ORDER_CREATE}`);
    return;
  }

  isSubmitting.value = true;
  (order.value?.type
    ? Promise.resolve()
    : store.commit.crossTab(
        updateCurrentOrderTypeAction({
          type: orderTypeDefault.value.value,
        })
      )
  ).then(() => {
    createOrder(store, t).finally(() => {
      isSubmitting.value = false;
    });
  });
}
</script>
