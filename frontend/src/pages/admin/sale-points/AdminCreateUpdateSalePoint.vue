<template>
  <div class="max-w-md q-mx-auto">
    <back-button />
    <big-spinner v-if="isSubscribing" />
    <q-form v-else @submit="onSubmit" @validation-error="onFormValidationError">
      <q-card class="q-pa-md">
        <q-card-section class="q-gutter-lg">
          <q-input
            v-model.trim="name"
            stack-label
            :label="`${t.salePointNameLabel} *`"
            lazy-rules
            type="text"
            :rules="[
              (val) => (!!val && val.length > 0) || t.fieldRequired,
              (val) =>
                val.length <= MAX_SALE_POINT_NAME_LENGTH ||
                t.maxLength({ max: MAX_SALE_POINT_NAME_LENGTH }),
            ]"
          />
          <email-input v-model="email" />
          <phone-input v-model="phone" shouldValidateFormat />
          <q-select
            :model-value="formatAddress(address)"
            use-input
            fill-input
            stack-label
            hide-selected
            clearable
            input-debounce="0"
            :options="filteredAddresses"
            @filter="filterAddresses"
            :label="`${t.address} *`"
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
                  {{ t.addNewAddress }}
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
          <q-toggle
            v-model="isDefault"
            :label="t.isDefault"
            size="lg"
            left-label
          />
        </q-card-section>
      </q-card>
      <div class="row justify-end q-gutter-sm q-mt-md">
        <q-btn
          :label="t.cancel"
          @click="() => router.back()"
          color="dark"
          flat
        />
        <q-btn
          :label="t.save"
          :loading="isSubmitting"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>

  <add-address-modal
    v-if="isAddAddressModalOpen"
    v-model="isAddAddressModalOpen"
    @submit="(isAddAddressModalOpen = false), (address = $event)"
  />
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  IAddress,
  IWorkSchedule,
  MAX_SALE_POINT_NAME_LENGTH,
  createSalePointAction,
  updateSalePointAction,
} from "donut-shared";
import { Notify } from "quasar";
import AddAddressModal from "src/components/AddAddressModal.vue";
import EmailInput from "src/components/EmailInput.vue";
import PhoneInput from "src/components/PhoneInput.vue";
import { formatAddress } from "src/lib/address";
import { generateRandomId } from "src/lib/generate-random-id";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import { SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isSubmitting = ref(false);
const name = ref("");
const phone = ref("");
const email = ref("");
const isDefault = ref(false);
const address = ref<IAddress>();
const workSchedule = ref<IWorkSchedule[]>([]);
const isAddAddressModalOpen = ref(false);

const id = computed(() => router.currentRoute.value.params.id);
const originalSalePoint = computed(() => {
  return id.value
    ? store.state.salePoints.salePoints.find((x) => x.id === id.value)
    : undefined;
});
const channels = computed(() =>
  id.value && !originalSalePoint.value ? [CHANNELS.SALE_POINTS] : []
);
let isSubscribing = useSubscription(channels, { store: store as any });

const filteredAddresses = computed(() =>
  [formatAddress(address.value)].filter(Boolean)
);
const filterAddresses = (val: string, update: any) => {
  update(() => {
    //
  });
};

const unsubscribe = watchEffect(
  () => {
    if (originalSalePoint.value) {
      name.value = originalSalePoint.value.name;
      email.value = originalSalePoint.value.email;
      phone.value = originalSalePoint.value.phone;
      address.value = originalSalePoint.value.address;
      isDefault.value = originalSalePoint.value.isDefault;
      workSchedule.value = originalSalePoint.value.workSchedule;

      unsubscribe();
    } else if (id.value && store.state.salePoints.salePoints.length) {
      router.push("/404");
    }
  },
  {
    flush: "post",
  }
);

const onSubmit = async () => {
  isSubmitting.value = true;
  store.commit
    .sync(
      originalSalePoint.value
        ? updateSalePointAction({
            salePoint: {
              id: originalSalePoint.value.id,
              name: name.value,
              address: address.value,
              email: email.value,
              workSchedule: workSchedule.value,
              isDefault: isDefault.value,
              phone: phone.value,
            },
          })
        : createSalePointAction({
            salePoint: {
              id: generateRandomId(),
              name: name.value,
              address: address.value,
              email: email.value,
              workSchedule: workSchedule.value,
              isDefault: isDefault.value,
              phone: phone.value,
            },
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalSalePoint.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/sale-points");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>
