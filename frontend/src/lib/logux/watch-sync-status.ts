import { CrossTabClient, status } from "@logux/client";
import { Notify, QNotifyUpdateOptions } from "quasar";
import { useI18nStore } from "../i18n";

export function watchSyncStatus(client: CrossTabClient) {
  let updateStutusFunc: any = null;
  const updateStatusNotification: (props?: QNotifyUpdateOptions) => void = (
    props
  ) => {
    if (updateStutusFunc || !props) {
      updateStutusFunc?.(props);
      if (!props) {
        updateStutusFunc = null;
      }
    } else {
      updateStutusFunc = Notify.create({
        ...props,
        position: "top",
        multiLine: true,
        timeout: 0,
        group: false,
      });
    }
  };

  status(client, (current) => {
    const t = useI18nStore();

    if (
      current === "connectingAfterWait" ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      current === "sendingAfterWait"
    ) {
      updateStatusNotification({
        type: "info",
        icon: "sync",
        message: t.value.sending,
        caption: "",
      });
    } else if (current === "synchronizedAfterWait") {
      updateStatusNotification({
        icon: "cloud_done",
        type: "positive",
        message: t.value.synchronized,
        caption: "",
      });
    } else if (current === "synchronized") {
      updateStatusNotification();
    } else if (current === "disconnected") {
      updateStatusNotification({
        icon: "cloud_off",
        type: "warning",
        message: t.value.disconnectedMessage,
        caption: "",
      });
    } else if (current === "wait") {
      updateStatusNotification({
        icon: "cloud_off",
        type: "warning",
        message: t.value.disconnectedMessage,
        caption: t.value.disconnectedCaption,
      });
    } else if (current === "protocolError") {
      updateStatusNotification({
        icon: "cached",
        type: "warning",
        message: t.value.protocolErrorMessage,
        caption: t.value.protocolErrorCaption,
      });
    }
  });
}
