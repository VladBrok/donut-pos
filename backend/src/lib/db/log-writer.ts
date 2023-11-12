import { logInfo } from "donut-shared/src/log.js";
import { LogWriter } from "drizzle-orm";

export class DbLogWriter implements LogWriter {
  write(message: string) {
    logInfo(message);
  }
}
