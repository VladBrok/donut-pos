<template>
  <div class="max-w-md q-mx-auto">
    <back-button />
    <big-spinner v-if="isSubscribing" />
    <q-form v-else @submit="onSubmit" @validation-error="onFormValidationError">
      <q-card class="q-pa-md">
        <q-card-section class="q-gutter-lg">
          <photo-upload
            v-model:url="imageUrl"
            v-model:file="imageFile"
          ></photo-upload>
          <q-input
            v-model.trim="name"
            stack-label
            :label="`${t.modificationNameLabel} *`"
            lazy-rules
            type="text"
            :rules="[
              (val) => (!!val && val.length > 0) || t.fieldRequired,
              (val) =>
                val.length <= MAX_MODIFICATION_NAME_LENGTH ||
                t.maxLength({ max: MAX_MODIFICATION_NAME_LENGTH }),
            ]"
          />
          <q-input
            v-model.number="price"
            stack-label
            :label="`${t.price} *`"
            lazy-rules
            type="number"
            step="0.01"
            :rules="[
              (val) => val !== '' || t.fieldRequired,
              (val) =>
                val <= MAX_MODIFICATION_PRICE ||
                t.maxValue({ max: MAX_MODIFICATION_PRICE }),
              (val) =>
                val >= MIN_MODIFICATION_PRICE ||
                t.minValue({ min: MIN_MODIFICATION_PRICE }),
            ]"
          />
          <q-input
            v-model.number="weight"
            stack-label
            :label="`${t.weight} *`"
            lazy-rules
            type="number"
            step="1"
            :rules="[
              (val) => val !== '' || t.fieldRequired,
              (val) =>
                val <= MAX_MODIFICATION_WEIGHT ||
                t.maxValue({ max: MAX_MODIFICATION_WEIGHT }),
              (val) =>
                val >= MIN_MODIFICATION_WEIGHT ||
                t.minValue({ min: MIN_MODIFICATION_WEIGHT }),
            ]"
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
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  MAX_MODIFICATION_NAME_LENGTH,
  MAX_MODIFICATION_PRICE,
  MAX_MODIFICATION_WEIGHT,
  MIN_MODIFICATION_PRICE,
  MIN_MODIFICATION_WEIGHT,
  createModificationAction,
  updateModificationAction,
} from "donut-shared";
import { Notify } from "quasar";
import { fractionalToWhole, wholeToFractional } from "src/lib/currency";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import PhotoUpload from "../../../components/PhotoUpload.vue";
import { blobToBase64 } from "../../../lib/blob-to-base64";
import { ERROR_TIMEOUT_MS, SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isSubmitting = ref(false);

const name = ref("");
const imageUrl = ref("");
const imageFile = ref<File>();
const price = ref<number | string>("");
const weight = ref<number | string>("");

const id = computed(() => router.currentRoute.value.params.id);
const originalModification = computed(() => {
  return id.value
    ? store.state.modifications.modifications.find((x) => x.id === id.value)
    : undefined;
});
const channels = computed(() =>
  id.value && !originalModification.value ? [CHANNELS.MODIFICATIONS] : []
);
let isSubscribing = useSubscription(channels, { store: store as any });

const unsubscribe = watchEffect(
  () => {
    if (originalModification.value) {
      name.value = originalModification.value.name;
      imageUrl.value = originalModification.value.imageUrl;
      price.value = fractionalToWhole(originalModification.value.price);
      weight.value = originalModification.value.weight;
      unsubscribe();
    } else if (id.value && store.state.modifications.modifications.length) {
      router.push("/404");
    }
  },
  {
    flush: "post",
  }
);

const onSubmit = async () => {
  let imageBase64 = "";
  try {
    if (imageUrl.value && imageFile.value) {
      imageBase64 = await blobToBase64(imageFile.value);
    }
  } catch {
    Notify.create({
      type: "negative",
      position: "top",
      timeout: ERROR_TIMEOUT_MS,
      message: t.value.imageCorrupted,
      multiLine: true,
      group: false,
    });
    return;
  }

  isSubmitting.value = true;
  store.commit
    .sync(
      originalModification.value
        ? updateModificationAction({
            id: originalModification.value.id,
            name: name.value,
            price: wholeToFractional(+price.value || 0),
            imageBase64,
            weight: +weight.value || 0,
          })
        : createModificationAction({
            name: name.value,
            price: wholeToFractional(+price.value || 0),
            imageBase64,
            weight: +weight.value || 0,
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalModification.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/modifications");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>
