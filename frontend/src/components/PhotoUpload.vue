<template>
  <div class="row justify-center q-mb-lg">
    <div class="image-md relative-position">
      <q-img :src="url" fit="cover" class="image-md rounded-borders" alt="" />
      <q-file
        ref="fileInputRef"
        class="show-validation-errors-only q-mr-sm"
        :accept="ALLOWED_IMAGE_TYPES.join(', ')"
        :model-value="file"
        @update:model-value="onFileSelected($event)"
        :rules="[
          (val) => {
            return (
              !val ||
              val.size <= MAX_IMAGE_FILE_SIZE_BYTES ||
              t.maxFileSize({
                max: (MAX_IMAGE_FILE_SIZE_BYTES / 1000000).toFixed(2),
              })
            );
          },
          (val) =>
            !val ||
            ALLOWED_IMAGE_TYPES.includes(val.type) ||
            t.allowedFilesAre({ allowed: ALLOWED_IMAGE_EXTENSIONS.join(', ') }),
        ]"
      ></q-file>
      <q-btn
        class="absolute-bottom-right-offset"
        icon="upload"
        round
        color="primary"
        @click="triggerFilePick"
        :title="t.uploadImage"
      >
        <q-tooltip>
          {{ t.uploadImage }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_FILE_SIZE_BYTES,
  MISSING_PHOTO_PLACEHOLDER_URL,
  assert,
} from "donut-shared";
import { QFile } from "quasar";
import { computed, onUnmounted, ref } from "vue";
import { useI18nStore } from "../lib/i18n";

const props = defineProps<{ url: string; file?: File }>();
const emit = defineEmits<{
  "update:url": [url: string];
  "update:file": [file: File | undefined];
}>();
const url = computed(() => props.url || MISSING_PHOTO_PLACEHOLDER_URL);
const file = computed(() => props.file);
const t = useI18nStore();
const fileInputRef = ref<QFile>();

onUnmounted(() => {
  if (file.value) {
    URL.revokeObjectURL(url.value);
    emit("update:file", undefined);
  }
});

const triggerFilePick = () => {
  assert(fileInputRef.value, "file input component is missing");
  fileInputRef.value.pickFiles();
};

const onFileSelected = (file?: File) => {
  emit("update:file", file);
  if (file) {
    URL.revokeObjectURL(url.value);
    emit("update:url", URL.createObjectURL(file));
  }
};
</script>
