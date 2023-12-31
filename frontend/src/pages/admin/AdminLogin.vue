<template>
  <login-page
    :is-logging-in="isLoggingIn"
    @submit="onSubmit"
    icon-name="o_lock"
  >
    <template v-slot:title>
      {{ t.adminLoginPageTitle }}
    </template>
  </login-page>
</template>

<script setup lang="ts">
import { loginAction } from "donut-shared/src/actions/auth";
import { useStore } from "src/store";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginPage from "../../components/LoginPage.vue";
import { useI18nStore } from "../../lib/i18n";

const t = useI18nStore();
const store = useStore();
const router = useRouter();
const isLoggingIn = ref(false);

const onSubmit = async (data: { password: string; email: string }) => {
  isLoggingIn.value = true;
  store.commit
    .sync(
      loginAction({
        email: data.email,
        password: data.password,
        permissions: {
          admin: true,
        },
      })
    )
    .then(() => {
      store.client.changeUser(
        store.state.auth.user.userId || "",
        store.state.auth.user.accessToken || ""
      );
      return router.push("/admin");
    })
    .finally(() => {
      isLoggingIn.value = false;
    });
};
</script>
