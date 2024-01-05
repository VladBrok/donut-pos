<template>
  <div class="q-pa-md bg-gray-lightest min-height-window">
    <div>
      <div class="q-my-xl text-center text-dark-ligher">
        <div>
          <q-icon :name="iconName" style="font-size: 55px" />
        </div>
        <h1 class="text-h3">
          <slot name="title"></slot>
        </h1>
      </div>
      <q-form
        @submit="onSubmit"
        class="max-w-sm q-mx-auto"
        @validation-error="onFormValidationError"
      >
        <q-card class="q-pa-md">
          <q-card-section class="q-gutter-lg">
            <!-- <phone-input v-model="phone" :shouldValidateFormat="false">
            </phone-input> -->
            <email-input v-model="email" />
            <password-input
              v-model="password"
              :should-validate-format="false"
              required
            >
            </password-input>
            <div>
              <q-btn
                :label="t.logIn"
                :loading="isLoggingIn"
                type="submit"
                color="primary"
                class="q-mx-auto d-block"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-form>
    </div>
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts">
import EmailInput from "src/components/EmailInput.vue";
import { onFormValidationError } from "src/lib/on-form-validation-error";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import PasswordInput from "../components/PasswordInput.vue";
import { useI18nStore } from "../lib/i18n";

const props = defineProps<{ isLoggingIn: boolean; iconName: string }>();
const isLoggingIn = computed(() => props.isLoggingIn);

const emit = defineEmits<{
  submit: [data: { password: string; email: string }];
}>();

const t = useI18nStore();
const router = useRouter();

// const phone = ref(
//   router.currentRoute.value.path.includes("admin")
//     ? "+48000000000"
//     : router.currentRoute.value.path.includes("waiter")
//     ? "+48100000001"
//     : "+48300020009"
// );
const email = ref(
  router.currentRoute.value.path.includes("admin")
    ? "admin@donut.com"
    : router.currentRoute.value.path.includes("waiter")
    ? "waiter@donut.com"
    : router.currentRoute.value.path.includes("kitchen")
    ? "kitchen@donut.com"
    : "client@donut.com"
); // TODO: remove
const password = ref(
  router.currentRoute.value.path.includes("admin") ? "1234" : "1234Db_3333>"
); // TODO: remove

const onSubmit = async () => {
  emit("submit", {
    password: password.value,
    email: email.value,
  });
};
</script>
