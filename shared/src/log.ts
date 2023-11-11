export enum LogType {
  Info = "INFO",
  Error = "ERROR",
  Warn = "WARN",
}

export async function log(type: LogType, ...messages: unknown[]) {
  const date = new Date().toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });

  const message = messages
    .map((x) =>
      typeof x === "object" || typeof x === "boolean" || x == null
        ? JSON.stringify(x)
        : x
    )
    .join(" ");

  if (process.env.NODE_ENV === "development") {
    console.log(`[${date}] ${type}:`, ...messages);
  } else {
    console.log(`[${date}] ${type}: ${message}`);
  }
}
