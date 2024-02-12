import { LoguxVuexStore } from "@logux/vuex";
import {
  CATEGORY_NAME_EXISTS,
  DINING_TABLE_EXISTS,
  EMPLOYEE_WITH_EMAIL_EXISTS,
  EMPLOYEE_WITH_PHONE_EXISTS,
  MODIFICATION_NAME_EXISTS,
  USER_NOT_FOUND,
} from "donut-shared";
import { logError, logInfo, logWarn } from "donut-shared/src/lib/log";
import { Notify } from "quasar";
import { ERROR_TIMEOUT_MS, NO_TIMEOUT } from "../constants";
import { useI18nStore } from "../i18n";

export function setUndoHandler(Store: LoguxVuexStore) {
  Store.client.type("logux/undo", (undoneAction) => {
    const t = useI18nStore();
    const undone = undoneAction as any;

    const reason = undone.reason;
    if (!reason) {
      logWarn("undo was called without reason:", undoneAction);
      return;
    }

    let message = "";
    if (!(t.value as any)[reason]) {
      logWarn(`translation for the undo reason "${reason}" was not found`);
      message = reason;
    } else {
      message =
        reason === USER_NOT_FOUND
          ? t.value.userNotFound({
              email: undone.action.payload.email,
            })
          : reason === CATEGORY_NAME_EXISTS
          ? t.value.categoryNameExists({
              name: undone.action.payload.name,
            })
          : reason === DINING_TABLE_EXISTS
          ? t.value.diningTableExists({
              tableNumber: undone.action.payload.table.number,
            })
          : reason === MODIFICATION_NAME_EXISTS
          ? t.value.modificationNameExists({
              name: undone.action.payload.name,
            })
          : reason === EMPLOYEE_WITH_PHONE_EXISTS
          ? t.value.employeeWithPhoneExists({
              phone: undone.action.payload.phone,
            })
          : reason === EMPLOYEE_WITH_EMAIL_EXISTS
          ? t.value.employeeWithEmailExists({
              email: undone.action.payload.email,
            })
          : (t.value as any)[reason];
    }

    const canRetry = false;
    const timeout = canRetry ? NO_TIMEOUT : ERROR_TIMEOUT_MS;
    const buttons = canRetry
      ? [
          {
            label: "Retry",
            color: "yellow",
            handler: () => {
              logInfo("retry:", undone.action);
              Store.commit
                .sync(undone.action)
                .then(() => {
                  logInfo("retry success:", undone.action);
                })
                .catch(() => {
                  logError("retry error:", undone.action);
                });
            },
          },
          {
            label: "Dismiss",
            color: "white",
            handler: () => {
              /* */
            },
          },
        ]
      : undefined;

    Notify.create({
      type: "negative",
      position: "top",
      timeout: timeout,
      message: message,
      multiLine: true,
      group: false,
      actions: buttons,
    });
  });
}
