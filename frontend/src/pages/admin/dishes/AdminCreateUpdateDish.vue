<template>
  <big-spinner v-if="isSubscribing" />
  <q-form v-else @submit="onSubmit" class="q-gutter-md max-w-md q-mx-auto">
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
        <q-select
          v-model="categoryName"
          use-input
          fill-input
          clearable
          hide-selected
          input-debounce="0"
          :options="filteredCategoryNames"
          @filter="filterCategories"
          :label="`${t.category} *`"
          :rules="[(val) => !!val || t.fieldRequired]"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section>
                {{ t.noResults }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input
          v-model.number="price"
          :label="`${t.price} *`"
          lazy-rules
          type="number"
          step="0.01"
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
          step="0.01"
          :rules="[
            (val) => val != null || t.fieldRequired,
            (val) =>
              val <= MAX_DISH_WEIGHT || t.maxValue({ max: MAX_DISH_WEIGHT }),
            (val) =>
              val >= MIN_DISH_WEIGHT || t.minValue({ min: MIN_DISH_WEIGHT }),
          ]"
        />
        <q-toggle v-model="isActive" :label="t.active" size="lg" left-label />
        <div class="icons-md">
          <label class="q-mb-sm q-mt-sm d-block">{{ t.description }}</label>
          <q-editor
            v-model="description"
            :placeholder="t.dishDescriptionPlaceholder"
            :toolbar="[
              ['bold', 'italic', 'strike', 'underline'],
              ['token', 'hr', 'link', 'custom_btn'],
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify'],
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7',
                  ],
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['print', 'fullscreen'],
              ['undo', 'redo'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />
        </div>
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
import { createDishAction, updateDishAction } from "donut-shared/src/actions";
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
import { computed, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
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
const price = ref<number>();
const weight = ref<number>();
const categoryName = ref("");
const filteredCategoryNames = ref<string[]>();
const isActive = ref(true);
const description = ref("");

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
  if (originalDish.value) {
    name.value = originalDish.value.name;
    imageUrl.value = originalDish.value.imageUrl;
    price.value = originalDish.value.price;
    weight.value = originalDish.value.weight;
    categoryName.value = originalDish.value.category?.name || "";
    isActive.value = originalDish.value.isActive;
    description.value = originalDish.value.description;
  } else if (id.value && store.state.dishes.dishes.length) {
    router.push("/404");
  }
});

watch(
  isSubscribing,
  () => {
    if (!isSubscribing) {
      filteredCategoryNames.value = store.state.dishCategories.categories.map(
        (x) => x.name
      );
    }
  },
  { immediate: true }
);

const filterCategories = (val: string, update: any) => {
  update(() => {
    const needle = val.toLowerCase();
    filteredCategoryNames.value = store.state.dishCategories.categories
      .filter((v) => v.name.toLowerCase().indexOf(needle) > -1)
      .map((x) => x.name);
  });
};

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
      originalDish.value
        ? updateDishAction({
            id: originalDish.value.id,
            name: name.value,
            price: price.value || 0,
            category: store.state.dishCategories.categories.find(
              (x) => x.name === categoryName.value
            )!,
            description: description.value,
            imageBase64,
            isActive: isActive.value,
            weight: weight.value || 0,
          })
        : createDishAction({
            name: name.value,
            price: price.value || 0,
            category: store.state.dishCategories.categories.find(
              (x) => x.name === categoryName.value
            )!,
            description: description.value,
            imageBase64,
            isActive: isActive.value,
            weight: weight.value || 0,
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalDish.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/dishes");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>
