import { log } from "donut-shared";
import { LogWriter } from "drizzle-orm";

export class DbLogWriter implements LogWriter {
  write(message: string) {
    log(message);
  }
}
