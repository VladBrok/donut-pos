<template>
  <q-form @submit="onSubmit" class="q-gutter-md max-w-sm q-mx-auto">
    <q-card class="q-pa-md">
      <q-card-section>
        <!-- TODO: extract photo input component -->
        <q-file
          ref="fileInputRef"
          v-model="imageFile"
          filled
          class="d-none"
          @update:model-value="onFileSelected()"
        ></q-file>
        <div class="row justify-center q-mb-lg">
          <div class="image-md relative-position">
            <q-img
              :src="imageUrl"
              fit="cover"
              class="image-md rounded-borders"
            />
            <q-btn
              class="absolute-bottom-right-offset"
              icon="upload"
              round
              color="primary"
              @click="triggerUpload"
            >
              <q-tooltip>
                {{ t.uploadImage }}
              </q-tooltip>
            </q-btn>
          </div>
        </div>
        <q-input
          v-model="name"
          label="Category name *"
          lazy-rules
          type="text"
          :rules="[(val) => (val && val.length > 0) || t.fieldRequired]"
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
import { assert, createDishCategoryAction } from "donut-shared";
import { MISSING_PHOTO_PLACEHOLDER_URL } from "donut-shared/src/constants";
import { Notify, QFile } from "quasar";
import { useStore } from "src/store";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();

const fileInputRef = ref<QFile>();
const isCreating = ref(false);
const name = ref("");
const imageFile = ref<File | null>(null);
// TODO: set image or placeholder everywhere on FE
const imageUrl = ref(MISSING_PHOTO_PLACEHOLDER_URL);

onUnmounted(() => {
  if (imageFile.value) {
    URL.revokeObjectURL(imageUrl.value);
    imageFile.value = null;
  }
});

// TODO: extract
function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve) => {
    // TODO: handle error
    const reader = new FileReader();
    reader.onloadend = () => {
      let result = reader.result as string;
      const idx = result.indexOf("base64,");
      result = result.slice(idx + 7);
      resolve(result);
    };
    reader.readAsDataURL(blob);
  });
}

const triggerUpload = () => {
  assert(fileInputRef.value, "file input component is missing");
  fileInputRef.value.pickFiles();
};

const onFileSelected = () => {
  if (imageFile.value) {
    URL.revokeObjectURL(imageUrl.value);
    imageUrl.value = URL.createObjectURL(imageFile.value);
  }
};

const onSubmit = async () => {
  const imageBase64 =
    !imageFile.value || imageUrl.value === MISSING_PHOTO_PLACEHOLDER_URL
      ? ""
      : await blobToBase64(imageFile.value);

  isCreating.value = true;
  store.commit
    .sync(
      createDishCategoryAction({
        name: name.value,
        imageBase64: imageBase64,
      })
    )
    .then(() => {
      // TODO: extract "create success", "delete success"... (dup)
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
