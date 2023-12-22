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
            stack-label
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
            stack-label
            :label="`${t.price} *`"
            lazy-rules
            type="number"
            step="0.01"
            :rules="[
              (val) => val !== '' || t.fieldRequired,
              (val) =>
                val <= MAX_DISH_PRICE || t.maxValue({ max: MAX_DISH_PRICE }),
              (val) =>
                val >= MIN_DISH_PRICE || t.minValue({ min: MIN_DISH_PRICE }),
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
                val <= MAX_DISH_WEIGHT || t.maxValue({ max: MAX_DISH_WEIGHT }),
              (val) =>
                val >= MIN_DISH_WEIGHT || t.minValue({ min: MIN_DISH_WEIGHT }),
            ]"
          />
          <q-toggle v-model="isActive" :label="t.active" size="lg" left-label />
          <div class="row justify-between items-center">
            <label class="d-block text-label">{{ t.modifications }}</label>
            <q-btn
              color="primary"
              icon="add"
              :label="t.addModification"
              @click="addModification()"
            />
          </div>
          <div
            v-for="(modification, i) in modifications"
            :key="i"
            class="row justify-between items-center no-wrap"
          >
            <q-select
              v-model="modification.name"
              use-input
              fill-input
              stack-label
              clearable
              hide-selected
              input-debounce="0"
              :options="modification.filteredNames"
              @filter="(val, update) => filterModifications(i)(val, update)"
              label=""
              :rules="[
                (val) =>
                  !val ||
                  modifications.every((m, idx) => idx >= i || m.name !== val) ||
                  t.sameModificationAlreadyAdded,
              ]"
              class="flex-grow q-mr-lg"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section>
                    {{ t.noResults }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-btn
              flat
              size="md"
              icon="o_delete"
              color="negative"
              dense
              @click="deleteModification(i)"
            >
            </q-btn>
          </div>
          <div class="icons-md">
            <label class="q-mb-sm q-mt-md d-block text-label">{{
              t.description
            }}</label>
            <wysiwyg-editor
              v-model="description"
              :placeholder="t.dishDescriptionPlaceholder"
            />
          </div>
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
  createDishAction,
  updateDishAction,
} from "donut-shared/src/actions/dishes";
import {
  CHANNELS,
  MAX_DISH_NAME_LENGTH,
  MAX_DISH_PRICE,
  MAX_DISH_WEIGHT,
  MIN_DISH_PRICE,
  MIN_DISH_WEIGHT,
} from "donut-shared/src/constants";
import { Notify } from "quasar";
import WysiwygEditor from "src/components/WysiwygEditor.vue";
import { fractionalToWhole, wholeToFractional } from "src/lib/currency";
import { createFuzzySearcher } from "src/lib/fuzzy-search";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import PhotoUpload from "../../../components/PhotoUpload.vue";
import { blobToBase64 } from "../../../lib/blob-to-base64";
import { ERROR_TIMEOUT_MS, SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";
import { sanitizeHtml } from "../../../lib/sanitize-html";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isSubmitting = ref(false);

const name = ref("");
const imageUrl = ref("");
const imageFile = ref<File>();
const price = ref<number | string>("");
const weight = ref<number | string>("");
const categoryName = ref("");
const modifications = reactive<{ name: string; filteredNames: string[] }[]>([]);
const isActive = ref(true);
const description = ref("");

const id = computed(() => router.currentRoute.value.params.id);
const originalDish = computed(() => {
  return id.value
    ? store.state.dishes.dishes.find((x) => x.id === id.value)
    : undefined;
});
const modificationNames = computed(() =>
  store.state.modifications.modifications.map((x) => x.name)
);
const channels = computed(() =>
  id.value && !originalDish.value
    ? [CHANNELS.DISHES, CHANNELS.DISH_CATEGORIES, CHANNELS.MODIFICATIONS]
    : [CHANNELS.DISH_CATEGORIES, CHANNELS.MODIFICATIONS]
);
const isSubscribing = useSubscription(channels, { store: store as any });
const fuzzySearch = computed(() =>
  createFuzzySearcher(store.state.dishCategories.categories, ["name"])
);
const categorySearchInput = ref("");
const filteredCategoryNames = computed(() =>
  fuzzySearch.value.search(categorySearchInput.value).map((x) => x.name)
);

const unsubscribe = watchEffect(
  () => {
    if (originalDish.value) {
      name.value = originalDish.value.name;
      imageUrl.value = originalDish.value.imageUrl;
      price.value = fractionalToWhole(originalDish.value.price);
      weight.value = originalDish.value.weight;
      categoryName.value = originalDish.value.category?.name || "";
      isActive.value = originalDish.value.isActive;
      description.value = sanitizeHtml(originalDish.value.description);
      for (const modification of originalDish.value.modifications) {
        addModification(modification.name);
      }
      unsubscribe();
    } else if (id.value && store.state.dishes.dishes.length) {
      router.push("/404");
    }
  },
  {
    flush: "post",
  }
);

watch(
  isSubscribing,
  () => {
    if (!isSubscribing) {
      modifications.forEach((x) => (x.filteredNames = modificationNames.value));
    }
  },
  { immediate: true }
);

const addModification = (name?: string) => {
  modifications.push({
    name: name || "",
    filteredNames: modificationNames.value,
  });
};

const deleteModification = (index: number) => {
  modifications.splice(index, 1);
};

const filterModifications = (index: number) => {
  return (val: string, update: any) => {
    // TODO: use fuzzy search here and in other places where similar needle stuff is used
    update(() => {
      const needle = val.toLowerCase();
      modifications[index].filteredNames =
        store.state.modifications.modifications
          .filter((v) => v.name.toLowerCase().indexOf(needle) > -1)
          .map((x) => x.name);
    });
  };
};

const filterCategories = (val: string, update: any) => {
  update(() => {
    categorySearchInput.value = val;
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
            price: wholeToFractional(+price.value || 0),
            category: store.state.dishCategories.categories.find(
              (x) => x.name === categoryName.value
            )!,
            modifications: modifications
              .filter((x) => x.name)
              .map(
                (x) =>
                  store.state.modifications.modifications.find(
                    (y) => y.name === x.name
                  )!
              ),
            description: description.value,
            imageBase64,
            isActive: isActive.value,
            weight: +weight.value || 0,
          })
        : createDishAction({
            name: name.value,
            price: wholeToFractional(+price.value || 0),
            category: store.state.dishCategories.categories.find(
              (x) => x.name === categoryName.value
            )!,
            modifications: modifications
              .filter((x) => x.name)
              .map(
                (x) =>
                  store.state.modifications.modifications.find(
                    (y) => y.name === x.name
                  )!
              ),
            description: description.value,
            imageBase64,
            isActive: isActive.value,
            weight: +weight.value || 0,
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
