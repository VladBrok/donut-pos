<template>
  <div>
    <div
      v-for="(scheduleEntry, i) of workSchedule"
      :key="i"
      class="row no-wrap gap-md q-mb-sm"
    >
      <div
        class="row items-center gap-sm no-wrap"
        style="flex-basis: 240px; flex-shrink: 0; flex-grow: 0"
      >
        <div style="flex: 0 0 30px">
          {{ t[`dayOfWeekShort${scheduleEntry.dayOfWeek}`] }}
        </div>
        <p
          v-if="scheduleEntry.openingTime == null"
          class="text-dark-gray text-no-wrap"
        >
          {{ t.weekend }}
        </p>
        <q-btn
          v-if="scheduleEntry.openingTime == null"
          flat
          dense
          color="primary"
          icon="add"
          @click="
            scheduleEntry.openingTime = '';
            scheduleEntry.closingTime = '';
          "
        >
          <q-tooltip>
            {{ t.addWorkTime }}
          </q-tooltip>
        </q-btn>
        <q-input
          v-if="scheduleEntry.openingTime != null"
          lazy-rules
          hide-bottom-space
          dense
          v-model="scheduleEntry.openingTime"
          mask="time"
          :rules="['time', (val) => !!val || t.fieldRequired]"
        >
        </q-input>
        <span v-if="scheduleEntry.openingTime != null">—</span>
        <q-input
          v-if="scheduleEntry.openingTime != null"
          lazy-rules
          hide-bottom-space
          dense
          v-model="scheduleEntry.closingTime"
          mask="time"
          :rules="['time', (val) => !!val || t.fieldRequired]"
        >
        </q-input>
        <q-btn
          v-if="scheduleEntry.openingTime != null"
          flat
          dense
          color="negative"
          icon="close"
          @click="
            scheduleEntry.openingTime = null;
            scheduleEntry.closingTime = null;
          "
        >
          <q-tooltip>
            {{ t.removeWorkTime }}
          </q-tooltip>
        </q-btn>
      </div>

      <div
        v-if="scheduleEntry.openingTime != null"
        class="row items-center no-wrap gap-sm"
      >
        <p
          v-if="scheduleEntry.breakStart == null"
          class="text-dark-gray text-no-wrap"
        >
          {{ t.noLunchBreak }}
        </p>
        <q-btn
          v-if="scheduleEntry.breakStart == null"
          flat
          dense
          color="primary"
          icon="add"
          @click="
            scheduleEntry.breakStart = '';
            scheduleEntry.breakEnd = '';
          "
        >
          <q-tooltip>
            {{ t.addLunchBreak }}
          </q-tooltip>
        </q-btn>
        <q-icon
          v-if="scheduleEntry.breakStart != null"
          name="o_restaurant_menu"
          style="font-size: 22px"
        >
        </q-icon>
        <q-input
          lazy-rules
          hide-bottom-space
          dense
          v-if="scheduleEntry.breakStart != null"
          v-model="scheduleEntry.breakStart"
          mask="time"
          :rules="['time', (val) => !!val || t.fieldRequired]"
        >
        </q-input>
        <span v-if="scheduleEntry.breakStart != null">—</span>
        <q-input
          lazy-rules
          hide-bottom-space
          dense
          v-if="scheduleEntry.breakStart != null"
          v-model="scheduleEntry.breakEnd"
          mask="time"
          :rules="['time', (val) => !!val || t.fieldRequired]"
        >
        </q-input>
        <q-btn
          v-if="scheduleEntry.breakStart != null"
          flat
          dense
          color="negative"
          icon="close"
          @click="
            scheduleEntry.breakStart = null;
            scheduleEntry.breakEnd = null;
          "
        >
          <q-tooltip>
            {{ t.removeLunchBreak }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IWorkSchedule } from "donut-shared";
import { useI18nStore } from "src/lib/i18n";
import { computed, reactive, watch } from "vue";

const props = defineProps<{
  schedule: IWorkSchedule[];
}>();

const emit = defineEmits<{
  updateSchedule: [schedule: IWorkSchedule[]];
}>();

const originalSchedule = computed(() => props.schedule);
const workSchedule = reactive<IWorkSchedule[]>([]);
const t = useI18nStore();

watch(workSchedule, () => {
  emit("updateSchedule", workSchedule);
});

watch(
  originalSchedule,
  () => {
    workSchedule.splice(0, workSchedule.length, ...originalSchedule.value);
  },
  { immediate: true }
);
</script>
