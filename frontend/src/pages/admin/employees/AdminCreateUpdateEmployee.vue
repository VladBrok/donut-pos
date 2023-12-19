<template>
  <div class="max-w-md q-mx-auto">
    <back-button />
    <big-spinner v-if="isSubscribing" />
    <q-form v-else @submit="onSubmit" @validation-error="onFormValidationError">
      <q-card class="q-pa-md">
        <q-card-section class="q-gutter-lg">
          <q-input
            v-model.trim="firstName"
            stack-label
            :label="`${t.firstName} *`"
            lazy-rules
            type="text"
            :rules="[
              (val) => (!!val && val.length > 0) || t.fieldRequired,
              (val) =>
                val.length <= FIRST_NAME_MAX_LENGTH ||
                t.maxLength({ max: FIRST_NAME_MAX_LENGTH }),
            ]"
          />
          <q-input
            v-model.trim="lastName"
            stack-label
            :label="`${t.lastName} *`"
            lazy-rules
            type="text"
            :rules="[
              (val) => (!!val && val.length > 0) || t.fieldRequired,
              (val) =>
                val.length <= LAST_NAME_MAX_LENGTH ||
                t.maxLength({ max: LAST_NAME_MAX_LENGTH }),
            ]"
          />
          <q-select
            v-model="roleName"
            use-input
            fill-input
            stack-label
            clearable
            hide-selected
            input-debounce="0"
            :options="filteredRoleNames"
            @filter="filterRoles"
            :label="`${t.role} *`"
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
          <phone-input v-model="phone" shouldValidateFormat> </phone-input>
          <password-input
            v-model="password"
            should-validate-format
            :required="!originalEmployee"
          >
          </password-input>
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
import { createEmployeeAction, updateEmployeeAction } from "donut-shared";
import {
  CHANNELS,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
} from "donut-shared/src/constants";
import { Notify } from "quasar";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { useStore } from "src/store";
import { computed, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import BigSpinner from "../../../components/BigSpinner.vue";
import PasswordInput from "../../../components/PasswordInput.vue";
import PhoneInput from "../../../components/PhoneInput.vue";
import { SUCCESS_TIMEOUT_MS } from "../../../lib/constants";
import { useI18nStore } from "../../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isSubmitting = ref(false);

const roleName = ref("");
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const password = ref("");
const filteredRoleNames = ref<string[]>();

const id = computed(() => router.currentRoute.value.params.id);
const originalEmployee = computed(() => {
  return id.value
    ? store.state.employees.employees.find((x) => x.id === id.value)
    : undefined;
});
const channels = computed(() =>
  id.value && !originalEmployee.value
    ? [CHANNELS.EMPLOYEES, CHANNELS.ROLES]
    : [CHANNELS.ROLES]
);
let isSubscribing = useSubscription(channels, { store: store as any });

const unsubscribe = watchEffect(
  () => {
    if (originalEmployee.value) {
      roleName.value = originalEmployee.value.role?.codeName || "";
      firstName.value = originalEmployee.value.firstName;
      lastName.value = originalEmployee.value.lastName;
      phone.value = originalEmployee.value.phone;
      unsubscribe();
    } else if (id.value && store.state.employees.employees.length) {
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
      filteredRoleNames.value = store.state.roles.roles.map((x) => x.codeName);
    }
  },
  { immediate: true }
);

const filterRoles = (val: string, update: any) => {
  update(() => {
    const needle = val.toLowerCase();
    filteredRoleNames.value = store.state.roles.roles
      .filter((v) => v.codeName.toLowerCase().indexOf(needle) > -1)
      .map((x) => x.codeName);
  });
};

const onSubmit = async () => {
  isSubmitting.value = true;
  store.commit
    .sync(
      originalEmployee.value
        ? updateEmployeeAction({
            id: originalEmployee.value.id,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            phone: phone.value,
            role: store.state.roles.roles.find(
              (x) => x.codeName === roleName.value
            )!,
          })
        : createEmployeeAction({
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
            phone: phone.value,
            role: store.state.roles.roles.find(
              (x) => x.codeName === roleName.value
            )!,
          })
    )
    .then(() => {
      Notify.create({
        type: "positive",
        position: "top",
        timeout: SUCCESS_TIMEOUT_MS,
        message: originalEmployee.value
          ? t.value.updateSuccess
          : t.value.createSuccess,
        multiLine: true,
        group: false,
      });
      router.push("/admin/employees");
    })
    .finally(() => {
      isSubmitting.value = false;
    });
};
</script>
