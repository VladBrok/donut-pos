export enum LogType {
  Info = "INFO",
  Error = "ERROR",
  Warn = "WARN",
}

let logger = (date: string, type: LogType, ...messages: unknown[]) => {
  console.log(`[${date}] ${type}:`, ...messages);
};

export function setLogger(
  theLogger: (date: string, type: LogType, ...messages: unknown[]) => void
) {
  logger = theLogger;
}

export async function logInfo(...messages: unknown[]) {
  await log(LogType.Info, undefined, ...messages);
}

export async function logWarn(...messages: unknown[]) {
  await log(LogType.Warn, undefined, ...messages);
}

export async function logError(...messages: unknown[]) {
  await log(LogType.Error, undefined, ...messages);
}

export async function log(
  type: LogType,
  theDate?: string,
  ...messages: unknown[]
) {
  const date =
    theDate ||
    new Date().toLocaleString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Warsaw",
    });

  // const message = messages
  //   .map((x) =>
  //     typeof x === "object" || typeof x === "boolean" || x == null
  //       ? JSON.stringify(x)
  //       : x
  //   )
  //   .join(" ");

  logger(date, type, ...messages);
}
