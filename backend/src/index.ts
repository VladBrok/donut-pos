import { Server } from "@logux/server";
import { logInfo } from "donut-shared/src/log.js";
import * as db from "./lib/db/index.js";
import authModule from "./modules/auth-module.js";
import counterModule from "./modules/counter-module.js";

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    fileUrl: import.meta.url,
  })
);
db.connect();

authModule(server);
counterModule(server);
server.channel<{ id: string }>("users/:id", {
  access(ctx) {
    return ctx.params.id === ctx.userId;
  },
  load(ctx) {}, // TODO: find out why without this client sends /subscribe 2 times
});

server.listen().then(() => {
  logInfo("server started");
});
