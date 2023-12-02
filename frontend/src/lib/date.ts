import dayjs from "dayjs";

export function formatDateTime(isoDateString: string): string {
  return dayjs
    .utc(isoDateString)
    .tz("Europe/Warsaw")
    .format("DD.MM.YYYY, HH:mm");
}
