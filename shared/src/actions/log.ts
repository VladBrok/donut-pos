import { createAction } from "../actions/index.js";
import { LogType } from "../lib/log.js";

export const writeLogAction = createAction<{
  type: LogType;
  messages: unknown[];
  date: string;
}>("log/write");
