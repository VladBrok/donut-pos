enum LogType {
  Info = "INFO",
  Error = "ERROR",
  Warn = "WARN",
}

export async function logInfo(...messages: unknown[]) {
  await log(LogType.Info, messages);
}

export async function logWarn(...messages: unknown[]) {
  await log(LogType.Warn, messages);
}

export async function logError(...messages: unknown[]) {
  await log(LogType.Error, messages);
}

async function log(type: LogType, ...messages: unknown[]) {
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
