import { Server } from "@logux/server";
import { UserNotFound, WrongPassword, log, loginAction } from "donut-shared";
import { loggedInAction } from "donut-shared/src/actions.js";
import { compareWithHash } from "./lib/crypt.js";
import * as db from "./lib/db/index.js";
import { decodeJwt, encodeJwt } from "./lib/jwt.js";

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    fileUrl: import.meta.url,
  })
);

db.connect();

server.auth(({ userId, token }) => {
  if (userId === "anonymous") {
    return true;
  }

  const jwtPayload = decodeJwt(token);
  return jwtPayload?.userId === userId;
});

server.channel<{ id: string }>("users/:id", {
  access(ctx) {
    return ctx.params.id === ctx.userId;
  },
  load(ctx) {}, // TODO: find out why without this client sends /subscribe 2 times
});

server.type(loginAction, {
  access(ctx) {
    return ctx.userId === "anonymous";
  },
  async process(ctx, action, meta) {
    const user = await db.findEmployeeByPhone(action.payload.phone);
    if (!user) {
      await server.undo(action, meta, UserNotFound);
      return;
    }

    const isPasswordValid = await compareWithHash(
      action.payload.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      await server.undo(action, meta, WrongPassword);
      return;
    }

    const accessToken = encodeJwt({ userId: user.id });
    await server.log.add(
      { id: meta.id, type: "logux/processed" },
      { clients: [ctx.clientId], status: "processed" }
    );
    ctx.sendBack(
      loggedInAction({
        userId: user.id,
        permissions: user.permissions,
        accessToken,
      })
    );
  },
});

const count = { value: 0 };

server.channel("counter", {
  async access(ctx, action, meta) {
    const user = await db.findEmployeeById(ctx.userId);
    return !!user?.permissions.admin;
  },
  load(ctx, action, meta) {
    return { type: "counter/init", count: count.value };
  },
});

server.type("counter/increment", {
  async access(ctx, action, meta) {
    const user = await db.findEmployeeById(ctx.userId);
    return !!user?.permissions.admin;
  },
  resend(ctx, action) {
    return `counter`;
  },
  process(ctx, action, meta) {
    log("process increment");
    count.value += action.amount || 1;
  },
});

server.type("counter/decrement", {
  async access(ctx, action, meta) {
    const user = await db.findEmployeeById(ctx.userId);
    return !!user?.permissions.admin;
  },
  resend(ctx, action) {
    return `counter`;
  },
  process(ctx, action, meta) {
    count.value -= action.amount || 1;
  },
});

server.listen().then(() => {
  log("server started");
});
