<template>
  <q-dialog>
    <q-card class="q-pb-sm dialog-md">
      <q-card-section class="row items-center">
        <q-space />
        <div class="text-h6">{{ t.addAddress }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-body1 text-dark-gray q-mb-lg">
          <p>
            {{ t.addressExplanation1 }}
          </p>
          <p>
            {{ t.addressExplanation2 }}
          </p>
        </div>
        <q-form
          @submit="onSubmit"
          @validation-error="onFormValidationError"
          ref="form"
        >
          <div class="address-inputs">
            <q-input
              v-model="data.city"
              stack-label
              :label="`${t.city} *`"
              lazy-rules
              type="text"
              :rules="[(val) => !!val || t.fieldRequired]"
            >
            </q-input>
            <q-input
              v-model="data.street"
              stack-label
              :label="`${t.street} *`"
              lazy-rules
              type="text"
              :rules="[(val) => !!val || t.fieldRequired]"
            >
            </q-input>
            <q-input
              v-model="data.homeNumber"
              stack-label
              :label="`${t.homeNumber} *`"
              lazy-rules
              type="text"
              :rules="[(val) => !!val || t.fieldRequired]"
            >
            </q-input>
            <q-input
              v-model="data.postalCode"
              stack-label
              mask="##-###"
              :label="`${t.postalCode} *`"
              lazy-rules
              type="text"
              :rules="[
                (val) => !!val || t.fieldRequired,
                (val) => POSTAL_CODE_REGEX.test(val) || t.invalidPostalCode,
              ]"
            >
            </q-input>
          </div>
          <div>
            <iframe
              class="q-mt-lg no-events"
              :src="mapSrc"
              width="100%"
              height="400px"
            >
            </iframe>
            <q-tooltip
              anchor="center middle"
              self="center middle"
              class="bg-negative text-white text-body2"
            >
              {{ t.readonlyMap }}
            </q-tooltip>
          </div>
          <q-btn
            color="primary"
            class="d-block q-mx-auto q-mt-md"
            type="submit"
            :loading="isLoading"
            @click="wasSubmit = true"
          >
            {{ t.save }}
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IAddress, POSTAL_CODE_REGEX } from "donut-shared";
import {
  createAddressAction,
  updateAddressAction,
} from "donut-shared/src/actions/addresses";
import { Notify, debounce } from "quasar";
import { makeGoogleMapSearchQuery } from "src/lib/address";
import { SUCCESS_TIMEOUT_MS } from "src/lib/constants";
import { useI18nStore } from "src/lib/i18n";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, reactive, ref, watch } from "vue";

const props = defineProps<{
  submitYourself?: boolean;
  originalAddress?: IAddress;
}>();

const emit = defineEmits<{
  submit: [address: IAddress];
}>();

const originalAddress = computed(() => props.originalAddress);
const isSubmitYourself = computed(() => props.submitYourself);
const t = useI18nStore();
const linkKey =
  "https://www.google.com/maps/embed/v1/search?key=AIzaSyA4wNwpARhZ7Y4FKCclfAwqLgxjKhACi0g";
// AIzaSyBK73HewkhHBVVs9nI98-HY_N7cZM_kdjE
const zoom = 14;
const defaultLoc = "Pinczow";
const q = defaultLoc;
const srcContent = linkKey + "&q=" + q + "&zoom=" + zoom;
const mapSrc = ref(srcContent);
const store = useStore();
const isLoading = ref(false);
const wasSubmit = ref(false);
const form = ref<any>();
const data = reactive<IAddress>({
  city: "",
  street: "",
  homeNumber: "",
  postalCode: "",
});

const searchAddressDebounced = debounce(() => {
  searchAddress();
}, 500);

watch(data, () => {
  searchAddressDebounced();
});

watch(
  originalAddress,
  () => {
    if (!originalAddress.value) {
      return;
    }

    Object.assign(data, originalAddress.value);
  },
  { immediate: true }
);

async function searchAddress() {
  const isValid = await form.value.validate(false);
  if (!wasSubmit.value) {
    form.value.resetValidation();
  }
  if (!isValid) {
    return;
  }

  const q = makeGoogleMapSearchQuery(data);
  mapSrc.value = linkKey + "&q=" + q + "&zoom=" + zoom;
}

function onSubmit() {
  if (!isSubmitYourself.value) {
    emit("submit", data);
    return;
  }

  isLoading.value = true;
  store.commit
    .sync(
      !originalAddress.value
        ? createAddressAction({
            address: data,
          })
        : updateAddressAction({
            id: originalAddress.value.id || "",
            address: data,
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalAddress.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      emit("submit", data);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>
