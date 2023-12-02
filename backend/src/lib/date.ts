import { logInfo } from "donut-shared/src/lib/log.js";

export function isoToDb(date: string): string {
  logInfo("saving to db:", date);
  return date;
}

export function dbToIso(date: string): string {
  logInfo("returning from db:", date);
  return date;
}
