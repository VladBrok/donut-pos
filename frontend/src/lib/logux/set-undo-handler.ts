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
import { formatPhoneNumber } from "src/lib/phone";
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
              email: formatPhoneNumber(undone.action.payload.email),
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

    /**
     * TODO: user should be able to retry certain actions in case of error.
     * Tell the user that their changes were reverted and they should retry.
     *
     * For example, "Wrong password" error shouldn't have the retry ability
     * because it doesn't make sense.
     * However, when user creates a dish with description, photo, etc.,
     * optimistic UI shows an update, but the server encounters an error during
     * saving changes to the database. In this case, client will see how the dish
     * disappears and they would be forced to enter the data once again just to try again.
     *
     * The retry should be available only for the user that created this action,
     * other clients that received this action via resend should simply see how it gets undone
     *
     * ALTERNATIVE solution: pessimistic UI (see login implementation, or just use .sync)
     *
     * Logux recommends Optimistic UI for when a user changes data
     * (save the form, press the like button) and Pessimistic UI for other operations.
     *
     * But here https://habr.com/ru/articles/491170/ they advice against Optimistic UI
     *
     * ALTERNATIVE: see notes (page with the list of errors)
     */
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
