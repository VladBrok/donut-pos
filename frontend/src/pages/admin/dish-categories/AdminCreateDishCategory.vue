<template>
  <q-form @submit="onSubmit" class="q-gutter-md max-w-sm q-mx-auto">
    <q-card class="q-pa-md">
      <q-card-section>
        <!-- TODO: extract photo input component -->
        <q-file
          ref="fileInputRef"
          v-model="imageBlob"
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
      <q-btn
        :label="t.cancel"
        @click="() => router.back()"
        type="submit"
        color="dark"
        flat
      />
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
import { assert } from "donut-shared";
import { MISSING_PHOTO_PLACEHOLDER_URL } from "donut-shared/src/constants";
import { QFile } from "quasar";
import { useStore } from "src/store";
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();

const fileInputRef = ref<QFile>();
const isCreating = ref(false);
const name = ref("");
const imageBlob = ref<Blob | null>(null);
// TODO: set image or placeholder everywhere on FE
const imageUrl = ref(MISSING_PHOTO_PLACEHOLDER_URL);

onUnmounted(() => {
  if (imageBlob.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
});

// TODO: extract
/**
 * Note: The blob's result cannot be directly decoded as Base64 without first removing the Data-URL declaration preceding the Base64-encoded data. To retrieve only the Base64 encoded string, first remove data:/;base64, from the result.
 */
function blobToBase64(blob: Blob) {
  return new Promise((resolve) => {
    // TODO: handle error
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const triggerUpload = () => {
  assert(fileInputRef.value, "file input component is missing");
  fileInputRef.value.pickFiles();
};

const onFileSelected = () => {
  if (imageBlob.value) {
    URL.revokeObjectURL(imageUrl.value);
    imageUrl.value = URL.createObjectURL(imageBlob.value);
  }
};

const onSubmit = async () => {
  console.log(imageUrl.value);
  const imageBase64 =
    !imageBlob.value || imageUrl.value === MISSING_PHOTO_PLACEHOLDER_URL
      ? ""
      : await blobToBase64(imageBlob.value);
  console.log(imageBase64);
  // TODO: server shoud accept base64 and upload it to https://api.imgbb.com/. Be careful with the note above (base64 format...)

  // isCreating.value = true;
  // store.commit.sync(createDishCategoryAction({
  //   name: name.value,
  //   imageUrl:
  // }))
  // isLoggingIn.value = true;
  // store.commit
  //   .sync(
  //     loginAction({
  //       phone: phone.value,
  //       password: password.value,
  //     })
  //   )
  //   .then(() => {
  //     store.client.changeUser(
  //       store.state.auth.user.userId || "",
  //       store.state.auth.user.accessToken || ""
  //     );
  //     router.push("/admin");
  //   })
  //   .finally(() => {
  //     isLoggingIn.value = false;
  //   });
};
</script>
