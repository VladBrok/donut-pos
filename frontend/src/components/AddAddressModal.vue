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
          <p>
            {{ t.addressExplanation3 }}
          </p>
        </div>
        <q-form
          @submit="searchAddress"
          @validation-error="onFormValidationError"
        >
          <q-input
            v-model="addressInput"
            class="max-w-xsm"
            stack-label
            :label="`${t.address} *`"
            lazy-rules
            type="text"
            :loading="isLoading"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <iframe
            class="q-mt-lg"
            :src="mapSrc"
            width="100%"
            height="400px"
          ></iframe>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IAddress } from "donut-shared";
import { debounce } from "quasar";
import { useI18nStore } from "src/lib/i18n";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { ref, watch } from "vue";

const emit = defineEmits<{
  submit: [address: IAddress];
}>();

const addressInput = ref("");
const t = useI18nStore();
const linkKey =
  "https://www.google.com/maps/embed/v1/search?key=AIzaSyBK73HewkhHBVVs9nI98-HY_N7cZM_kdjE";
const zoom = 14;
const defaultLoc = "Pinczow";
const q = defaultLoc;
const srcContent = linkKey + "&q=" + q + "&zoom=" + zoom;
const mapSrc = ref(srcContent);
const isLoading = ref(false);

const searchAddressDebounced = debounce(() => {
  searchAddress();
  isLoading.value = false;
}, 500);

watch(addressInput, () => {
  isLoading.value = true;
  searchAddressDebounced();
});

async function searchAddress() {
  const q = addressInput.value || defaultLoc;
  mapSrc.value = linkKey + "&q=" + q + "&zoom=" + zoom;
}
</script>
