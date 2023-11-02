import { Server } from "@logux/server";
import { log, loginAction } from "donut-shared";
import { LogType } from "donut-shared/src/log.js";
import { decodeJwt, encodeJwt } from "./lib/jwt.js";
import * as db from "./lib/db.js";
import { compareWithHash } from "./lib/crypt.js";
import { loggedInAction } from "donut-shared/src/actions.js";

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    fileUrl: import.meta.url,
  })
);

server.auth(({ userId, token }) => {
  if (userId === "anonymous") {
    return true;
  }

  const jwtPayload = decodeJwt(token);
  return jwtPayload?.userId === userId;
});

server.type(loginAction, {
  access(ctx) {
    return ctx.userId === "anonymous";
  },
  async process(ctx, action, meta) {
    const user = await db.findUserByPhone(action.payload.phone);
    if (!user) {
      await server.undo(
        action,
        meta,
        `User with phone ${action.payload.phone} was not found`
      );
      return;
    }

    const isPasswordValid = await compareWithHash(
      action.payload.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      await server.undo(action, meta, "Wrong password");
      return;
    }

    const accessToken = encodeJwt({ userId: user.id }, "access");
    const refreshToken = encodeJwt({ userId: user.id }, "refresh");
    await db.deleteRefreshTokenOfUser(user.id);
    await db.addRefreshToken(refreshToken, user.id);
    await ctx.sendBack(
      loggedInAction({ userId: user.id, accessToken, refreshToken })
    );
  },
});

const count = { value: 0 };

server.channel("counter", {
  access(ctx, action, meta) {
    return true;
  },
  load(ctx, action, meta) {
    return { type: "counter/init", count: count.value };
  },
});

server.type("counter/increment", {
  access(ctx, action, meta) {
    return true;
  },
  resend(ctx, action) {
    return `counter`;
  },
  process(ctx, action, meta) {
    console.log("increment process:", action);
    count.value += action.amount || 1;
  },
});

server.type("counter/decrement", {
  access(ctx, action, meta) {
    return true;
  },
  resend(ctx, action) {
    return `counter`;
  },
  process(ctx, action, meta) {
    console.log("decrement process:", action);
    count.value -= action.amount || 1;
  },
});

server.listen().then(() => {
  log("server started");
});
