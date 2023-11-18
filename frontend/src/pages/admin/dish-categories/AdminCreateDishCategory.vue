<template>
  <q-form @submit="onSubmit" class="q-gutter-md max-w-sm q-mx-auto">
    <q-card class="q-pa-md">
      <q-card-section>
        <photo-upload
          v-model:url="imageUrl"
          v-model:file="imageFile"
        ></photo-upload>
        <q-input
          v-model="name"
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

    <div class="row justify-end q-gutter-sm">
      <q-btn :label="t.cancel" @click="() => router.back()" color="dark" flat />
      <q-btn
        :label="t.save"
        :loading="isCreating"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { createDishCategoryAction } from "donut-shared";
import { MAX_DISH_CATEGORY_NAME_LENGTH } from "donut-shared/src/constants";
import { Notify } from "quasar";
import { useStore } from "src/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PhotoUpload from "../../../components/PhotoUpload.vue";
import { blobToBase64 } from "../../../lib/blob-to-base64";
import { ERROR_TIMEOUT_MS, SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();

const isCreating = ref(false);
const name = ref("");
const imageUrl = ref("");
const imageFile = ref<File>();

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

  isCreating.value = true;
  store.commit
    .sync(
      createDishCategoryAction({
        name: name.value,
        imageBase64: imageBase64,
      })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/dish-categories");
    })
    .finally(() => {
      isCreating.value = false;
    });
};
</script>
