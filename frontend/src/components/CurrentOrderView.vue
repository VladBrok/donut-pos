<template>
  <q-form @submit="onSubmit" @validation-error="onFormValidationError">
    <OrderView
      :has-content="Boolean(order)"
      :dish-count="getDishesInOrderCount(order)"
      :total-cost="totalCost"
      :delivery-cost="DELIVERY_COST"
      :dish-cost="dishCost"
      :order-type="order?.type"
      custom-empty
    >
      <template #content>
        <big-spinner v-if="isSubscribing" />
        <div v-else>
          <div>
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
            <div v-if="order?.type === ORDER_TYPES.DELIVERY">
              <q-select
                :model-value="formatAddress(order.address)"
                @update:model-value="
                  store.commit.crossTab(
                    updateCurrentOrderAddressAction({
                      address: addresses.find(
                        (x) => formatAddress(x) === $event
                      ),
                    })
                  )
                "
                use-input
                fill-input
                stack-label
                hide-selected
                clearable
                input-debounce="0"
                :options="filteredAddresses"
                @filter="filterAddresses"
                :label="`${t.deliveryAddress} *`"
                :rules="[(val) => (!!val && val.length > 0) || t.fieldRequired]"
              >
                <template v-slot:after>
                  <q-btn
                    round
                    dense
                    icon="add"
                    color="primary"
                    @click="isAddAddressModalOpen = true"
                  >
                    <q-tooltip>
                      {{ t.addNewDeliveryAddress }}
                    </q-tooltip>
                  </q-btn>
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section>
                      {{ t.noResults }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <q-input
              v-if="!isClient && order?.type === ORDER_TYPES.DELIVERY"
              :model-value="order?.client?.firstName"
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderClientFirstNameAction({
                    firstName: $event?.toString() || '',
                  })
                )
              "
              stack-label
              :label="`${t.clientFirstName} *`"
              lazy-rules
              type="text"
              :rules="[
                (val) => (!!val && val.length > 0) || t.fieldRequired,
                (val) =>
                  val.length <= FIRST_NAME_MAX_LENGTH ||
                  t.maxLength({ max: FIRST_NAME_MAX_LENGTH }),
              ]"
            />
            <phone-input
              v-if="!isClient && order?.type === 'delivery'"
              :model-value="order?.client?.phone || ''"
              @update:model-value="
                store.commit.crossTab(
                  updateCurrentOrderClientPhoneAction({
                    phone: $event,
                  })
                )
              "
              shouldValidateFormat
            />
            <q-select
              v-if="order?.type === ORDER_TYPES.DINE_IN"
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
            <q-img src="~assets/cart.svg" alt="" fit="cover" class="image-md" />
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
  />

  <confirm-dialog v-model="isConfirmOrderCreateModalOpen">
    <template #body>
      <div class="row no-wrap">
        <div>
          {{
            t.confirmOrderWithTakenTableCreate1({
              tableNumber: order?.table?.number || "",
            })
          }}
        </div>
        &nbsp;
        <order-number-title
          :orderNumber="store.state.orders.tableTakenByOrderNumber || ''"
          is-link
        />
      </div>
      <div>{{ t.confirmOrderWithTakenTableCreate2 }}</div>
    </template>
    <template #confirmButton>
      <q-btn
        flat
        :label="t.createOrder"
        color="primary"
        @click="
          (isCreateConfirmed = true),
            (isConfirmOrderCreateModalOpen = false),
            onSubmit()
        "
      />
    </template>
  </confirm-dialog>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  ANONYMOUS,
  CHANNELS,
  COMMENT_MAX_LENGTH,
  DELIVERY_COST,
  FIRST_NAME_MAX_LENGTH,
  ORDER_TYPES,
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
  updateCurrentOrderClientFirstNameAction,
  updateCurrentOrderClientPhoneAction,
  updateCurrentOrderTypeAction,
  updatePreviousOrderAction,
} from "donut-shared/src/actions/current-order";
import {
  checkTableTakenAction,
  updateCreateOrderAfterAuthAction,
} from "donut-shared/src/actions/orders";
import AddAddressModal from "src/components/AddAddressModal.vue";
import BigSpinner from "src/components/BigSpinner.vue";
import DishInOrder from "src/components/DishInOrder.vue";
import OrderNumberTitle from "src/components/OrderNumberTitle.vue";
import OrderView from "src/components/OrderView.vue";
import PhoneInput from "src/components/PhoneInput.vue";
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
const isCreateConfirmed = ref(false);
const isSubmitting = ref(false);
const isConfirmOrderCreateModalOpen = ref(false);
const userId = computed(() => store.state.auth.user.userId);
const channels = computed(() => {
  return userId.value === ANONYMOUS.userId
    ? [CHANNELS.DINING_TABLES]
    : [CHANNELS.DINING_TABLES, CHANNELS.ADDRESSES_OF_CLIENT(userId.value)];
});

const isClient = computed(() => store.state.auth.user.permissions?.client);
const addresses = computed(() =>
  order.value?.address && !order.value.address.id
    ? [...store.state.addresses.addresses, order.value?.address]
    : store.state.addresses.addresses
);
const addressSearchInput = ref("");
const addressFuzzySearch = computed(() =>
  createFuzzySearcher(addresses.value, [
    "city",
    "homeNumber",
    "postalCode",
    "street",
  ])
);
const filteredAddresses = computed(() =>
  addressFuzzySearch.value
    .search(addressSearchInput.value)
    .map((x) => formatAddress(x))
);

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

// TODO: it's a mess. Calculate it in one place (make a function that will return an object with total cost, delivery cost, dish cost, etc. and make a component that will display it. Use this component in OrderView)
const dishCost = computed(
  () => dishesInOrder.value?.reduce((sum, cur) => sum + cur.totalCost, 0) || 0
);
const totalCost = computed(
  () =>
    dishCost.value +
    (order.value?.type === ORDER_TYPES.DELIVERY ? DELIVERY_COST : 0)
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
    ? orderTypes.value.find((x) => x.value === ORDER_TYPES.DINE_IN)!
    : orderTypes.value.find((x) => x.value === ORDER_TYPES.TAKEOUT)!
);
const router = useRouter();
const isLoggedIn = useIsLoggedIn();
const requiredAddressNotSpecified = computed(
  () => order.value?.type === ORDER_TYPES.DELIVERY && !order.value.address
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

    if (order.value && addresses.value.length && !order.value?.address) {
      store.commit.crossTab(
        updateCurrentOrderAddressAction({
          address: addresses.value[0],
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

const filterAddresses = (val: string, update: any) => {
  update(() => {
    addressSearchInput.value = val;
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
  try {
    if (!order.value?.type) {
      await store.commit.crossTab(
        updateCurrentOrderTypeAction({
          type: orderTypeDefault.value.value,
        })
      );
    }

    if (
      order.value?.type === ORDER_TYPES.DINE_IN &&
      order.value.table &&
      !isClient.value &&
      !isCreateConfirmed.value
    ) {
      await store.commit.sync(
        checkTableTakenAction({
          tableId: order.value.table.id,
        })
      );
      if (store.state.orders.tableTakenByOrderNumber) {
        isConfirmOrderCreateModalOpen.value = true;
        return;
      }
    } else if (isCreateConfirmed.value) {
      isCreateConfirmed.value = false;
    }

    await createOrder(store, t);
  } finally {
    isSubmitting.value = false;
  }
}
</script>
