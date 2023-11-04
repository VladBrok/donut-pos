<template>
  <h1>dashboard</h1>
  <q-btn
    outline
    color="negative"
    label="Logout"
    icon="logout"
    @click="logoutAdmin"
  />
  <pre>
    {{ JSON.stringify(user, undefined, 4) }}
  </pre>
</template>

<script setup lang="ts">
import { log, logoutAction } from "donut-shared";
import { useStore } from "src/store";
import { computed } from "vue";
import { ANONYMOUS } from "../../store/auth/state";

const store = useStore();
const user = computed(() => store.state.auth.user);

const logoutAdmin = () => {
  store.commit
    .crossTab(
      logoutAction({ accessToken: store.state.auth.user.accessToken || "" })
    )
    .then(() => {
      store.client.changeUser(ANONYMOUS.userId);
    });
};
</script>
