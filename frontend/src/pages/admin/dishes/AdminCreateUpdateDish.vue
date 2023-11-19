<template>
  <big-spinner v-if="isSubscribing" />
  <q-form v-else @submit="onSubmit" class="q-gutter-md max-w-sm q-mx-auto">
    <!-- TODO: add validations -->
    <q-card class="q-pa-md">
      <q-card-section>
        <photo-upload
          v-model:url="imageUrl"
          v-model:file="imageFile"
        ></photo-upload>
        <q-input
          v-model="name"
          :label="`${t.dishNameLabel} *`"
          lazy-rules
          type="text"
          :rules="[
            (val) => (!!val && val.length > 0) || t.fieldRequired,
            (val) =>
              val.length <= MAX_DISH_NAME_LENGTH ||
              t.maxLength({ max: MAX_DISH_NAME_LENGTH }),
          ]"
        />
        <q-input
          v-model.number="price"
          :label="`${t.price} *`"
          lazy-rules
          type="number"
          :rules="[
            (val) => val != null || t.fieldRequired,
            (val) =>
              val <= MAX_DISH_PRICE || t.maxValue({ max: MAX_DISH_PRICE }),
            (val) =>
              val >= MIN_DISH_PRICE || t.minValue({ min: MIN_DISH_PRICE }),
          ]"
        />
        <q-input
          v-model.number="weight"
          :label="`${t.weight} *`"
          lazy-rules
          type="number"
          :rules="[
            (val) => val != null || t.fieldRequired,
            (val) =>
              val <= MAX_DISH_WEIGHT || t.maxValue({ max: MAX_DISH_WEIGHT }),
            (val) =>
              val >= MIN_DISH_WEIGHT || t.minValue({ min: MIN_DISH_WEIGHT }),
          ]"
        />
      </q-card-section>
    </q-card>

    <div class="row justify-end q-gutter-sm">
      <q-btn :label="t.cancel" @click="() => router.back()" color="dark" flat />
      <q-btn
        :label="t.save"
        :loading="isSubmitting"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useSubscription } from "@logux/vuex";
import {
  CHANNELS,
  MAX_DISH_NAME_LENGTH,
  MAX_DISH_PRICE,
  MAX_DISH_WEIGHT,
  MIN_DISH_PRICE,
  MIN_DISH_WEIGHT,
} from "donut-shared/src/constants";
import { Notify } from "quasar";
import { useStore } from "src/store";
import { computed, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BigSpinner from "../../../components/BigSpinner.vue";
import PhotoUpload from "../../../components/PhotoUpload.vue";
import { blobToBase64 } from "../../../lib/blob-to-base64";
import { ERROR_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isSubmitting = ref(false);

const name = ref("");
const imageUrl = ref("");
const imageFile = ref<File>();
const price = ref<number>();
const weight = ref<number>();
const description = ref<string>();

const id = computed(() => router.currentRoute.value.params.id);
const originalDish = computed(() => {
  return id.value
    ? store.state.dishes.dishes.find((x) => x.id === id.value)
    : undefined;
});
const channels = computed(() =>
  id.value && !originalDish.value
    ? [CHANNELS.DISHES, CHANNELS.DISH_CATEGORIES]
    : [CHANNELS.DISH_CATEGORIES]
);
let isSubscribing = useSubscription(channels, { store: store as any });

watchEffect(() => {
  // if (originalCategory.value) {
  //   name.value = originalCategory.value.name;
  //   imageUrl.value = originalCategory.value.imageUrl;
  // } else if (id.value && store.state.dishCategories.categories.length) {
  //   router.push("/404");
  // }
});

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

  // isSubmitting.value = true;
  // store.commit
  //   .sync(
  //     originalCategory.value
  //       ? updateDishCategoryAction({
  //           id: originalCategory.value.id,
  //           name: name.value,
  //           imageBase64: imageBase64,
  //         })
  //       : createDishCategoryAction({
  //           name: name.value,
  //           imageBase64: imageBase64,
  //         })
  //   )
  //   .then(() => {
  //     Notify.create({
  //       type: "positive",
  //       position: "top",
  //       timeout: SUCCESS_TIMEOUT_MS,
  //       message: originalCategory.value
  //         ? t.value.updateSuccess
  //         : t.value.createSuccess,
  //       multiLine: true,
  //       group: false,
  //     });
  //     router.push("/admin/dish-categories");
  //   })
  //   .finally(() => {
  //     isSubmitting.value = false;
  //   });
};
</script>
