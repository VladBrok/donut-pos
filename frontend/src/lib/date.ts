import dayjs from "dayjs";

export function formatDateTime(isoDateString: string): string {
  return dayjs.utc(isoDateString).local().format("DD.MM.YYYY, HH:mm");
}

export function formatDateTimeReadable(isoDateString: string): string {
  const localDate = dayjs.utc(isoDateString).local();
  return localDate.format("MMM DD, YYYY HH:mm");
}

export function sortByDate<T>(arr: T[], getIsoDate: (el: T) => string): T[] {
  return arr
    .slice()
    .sort(
      (a, b) =>
        dayjs.utc(getIsoDate(a)).unix() - dayjs.utc(getIsoDate(b)).unix()
    );
}
