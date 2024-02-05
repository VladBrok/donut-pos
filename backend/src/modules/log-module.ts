import { Server } from "@logux/server";
import { writeLogAction } from "donut-shared";
import { log } from "donut-shared/src/lib/log.js";

export default function logModule(server: Server) {
  server.type(writeLogAction, {
    access(ctx) {
      return true;
    },
    async process(ctx, action, meta) {
      log(action.payload.type, action.payload.date, ...action.payload.messages);
    },
  });
}
