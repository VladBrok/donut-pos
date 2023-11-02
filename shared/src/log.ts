export enum LogType {
  INFO = "INFO",
  ERROR = "ERROR",
}

export async function log<T>(message: T, type = LogType.INFO) {
  const date = new Date().toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  });

  console.log(`[${date}] ${type}: ${message}`);
}
