<template>
  <div class="max-w-sm q-mx-auto">
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
            :label="`${t.categoryNameLabel} *`"
            lazy-rules
            type="text"
            :rules="[
              (val) => (!!val && val.length > 0) || t.fieldRequired,
              (val) =>
                val.length <= MAX_DISH_CATEGORY_NAME_LENGTH ||
                t.maxLength({ max: MAX_DISH_CATEGORY_NAME_LENGTH }),
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
import { CHANNELS, MAX_DISH_CATEGORY_NAME_LENGTH } from "donut-shared";
import {
  createDishCategoryAction,
  updateDishCategoryAction,
} from "donut-shared/src/actions/dish-categories";
import { Notify } from "quasar";
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

const id = computed(() => router.currentRoute.value.params.id);
const originalCategory = computed(() => {
  return id.value
    ? store.state.dishCategories.categories.find((x) => x.id === id.value)
    : undefined;
});
const channels = computed(() =>
  id.value && !originalCategory.value ? [CHANNELS.DISH_CATEGORIES] : []
);
let isSubscribing = useSubscription(channels, { store: store as any });

const unsubscribe = watchEffect(
  () => {
    if (originalCategory.value) {
      name.value = originalCategory.value.name;
      imageUrl.value = originalCategory.value.imageUrl;
      unsubscribe();
    } else if (id.value && store.state.dishCategories.categories.length) {
      router.push("/404");
    }
  },
  { flush: "post" }
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
      originalCategory.value
        ? updateDishCategoryAction({
            id: originalCategory.value.id,
            name: name.value,
            imageBase64: imageBase64,
          })
        : createDishCategoryAction({
            name: name.value,
            imageBase64: imageBase64,
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalCategory.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/dish-categories");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>
