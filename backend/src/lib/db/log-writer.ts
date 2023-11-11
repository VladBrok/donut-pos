import { log } from "donut-shared";
import { LogType } from "donut-shared/src/log.js";
import { LogWriter } from "drizzle-orm";

export class DbLogWriter implements LogWriter {
  write(message: string) {
    log(LogType.Info, message);
  }
}
