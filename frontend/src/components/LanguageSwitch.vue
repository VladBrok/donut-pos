<template>
  <q-select
    :model-value="''"
    @update:model-value="(value) => (localeVal = value)"
    :options="AVAILABLE_LOCALES"
    hide-bottom-space
    outlined
    dense
    class="language-switch-select"
  >
    <template v-slot:prepend>
      <q-img
        :src="`/images/${localeVal}.svg`"
        :alt="localeVal"
        fit="cover"
        class="country-icon"
      />
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class="bg-gray-lightest">
        <q-item-section>
          <div class="row justify-center items-center gap-sm">
            <q-img
              :src="`/images/${scope.opt}.svg`"
              alt=""
              fit="cover"
              class="country-icon"
            />
          </div>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { AVAILABLE_LOCALES, locale, setting } from "src/lib/i18n";
import { ref, watch } from "vue";

const localeVal = ref(locale.get());

locale.subscribe((value) => {
  localeVal.value = value || "";
});

watch(localeVal, () => {
  setting.set(localeVal.value);
});
</script>
