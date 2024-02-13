<template>
  <div>
    <div
      v-for="(scheduleEntry, i) of workSchedule"
      :key="i"
      class="work-schedule-entry no-wrap"
    >
      <div class="work-schedule-entry-left row items-center gap-sm no-wrap">
        <div class="work-schedule-day-of-week">
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
          :title="t.addWorkTime"
        >
          <q-tooltip>
            {{ t.addWorkTime }}
          </q-tooltip>
        </q-btn>
        <q-input
          hide-bottom-space
          no-error-icon
          v-if="scheduleEntry.openingTime != null"
          lazy-rules
          dense
          v-model="scheduleEntry.openingTime"
          mask="time"
          reactive-rules
          :rules="[
            'time',
            (val) => !!val || t.fieldRequired,
            (val) =>
              !dayjs(scheduleEntry.closingTime, 'HH:mm', true).isValid() ||
              dayjs(val, 'HH:mm').isBefore(
                dayjs(scheduleEntry.closingTime, 'HH:mm')
              ) ||
              t.openingTimeBeforeClosing,
            (val) =>
              !dayjs(scheduleEntry.breakStart, 'HH:mm', true).isValid() ||
              dayjs(val, 'HH:mm').isBefore(
                dayjs(scheduleEntry.breakStart, 'HH:mm')
              ) ||
              t.openingTimeBeforeBreakStart,
          ]"
        >
        </q-input>
        <span v-if="scheduleEntry.openingTime != null">—</span>
        <q-input
          v-if="scheduleEntry.openingTime != null"
          hide-bottom-space
          no-error-icon
          lazy-rules
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
          :title="t.removeWorkTime"
        >
          <q-tooltip>
            {{ t.removeWorkTime }}
          </q-tooltip>
        </q-btn>
      </div>

      <div
        v-if="scheduleEntry.openingTime != null"
        class="work-schedule-entry-right row items-center no-wrap gap-sm"
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
          :title="t.addLunchBreak"
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
          v-if="scheduleEntry.breakStart != null"
          reactive-rules
          hide-bottom-space
          no-error-icon
          lazy-rules
          dense
          v-model="scheduleEntry.breakStart"
          mask="time"
          :rules="[
            'time',
            (val) => !!val || t.fieldRequired,
            (val) =>
              !dayjs(scheduleEntry.breakEnd, 'HH:mm', true).isValid() ||
              dayjs(val, 'HH:mm').isBefore(
                dayjs(scheduleEntry.breakEnd, 'HH:mm')
              ) ||
              t.breakStartBeforeEnd,
          ]"
        >
        </q-input>
        <span v-if="scheduleEntry.breakStart != null">—</span>
        <q-input
          v-if="scheduleEntry.breakStart != null"
          hide-bottom-space
          no-error-icon
          lazy-rules
          dense
          reactive-rules
          v-model="scheduleEntry.breakEnd"
          mask="time"
          :rules="[
            'time',
            (val) => !!val || t.fieldRequired,
            (val) =>
              !dayjs(scheduleEntry.closingTime, 'HH:mm', true).isValid() ||
              dayjs(val, 'HH:mm').isBefore(
                dayjs(scheduleEntry.closingTime, 'HH:mm')
              ) ||
              t.breakEndBeforeClosing,
          ]"
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
          :title="t.removeLunchBreak"
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
import dayjs from "dayjs";
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
    if (
      JSON.stringify(originalSchedule.value) === JSON.stringify(workSchedule)
    ) {
      return;
    }

    workSchedule.splice(0, workSchedule.length, ...originalSchedule.value);
  },
  { immediate: true }
);
</script>
