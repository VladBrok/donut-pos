import dayjs from "dayjs";

export function formatDateTime(isoDateString: string): string {
  return dayjs.utc(isoDateString).local().format("DD.MM.YYYY, HH:mm");
}
