import { Server } from "@logux/server";
import { assert, log, loginAction } from "donut-shared";
import { decodeJwt, encodeJwt } from "./lib/jwt.js";
import * as db from "./lib/db.js";
import { compareWithHash } from "./lib/crypt.js";
import { loggedInAction, logoutAction } from "donut-shared/src/actions.js";

// TODO: protect API, especially password, against brute force (? as far as I know, logux has some king of built-in mechanism for this, need check)
// TODO: on sensitive operations, such as password change or device logout, disconnect the user and require login again (to authorize these operations, token should be created no more than 3 minutes ago) (e.g. enter new password -> confirm that it's you -> change password -> logout)

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    fileUrl: import.meta.url,
  })
);

server.auth(({ userId, token }) => {
  log(`auth: ${userId} ${token}`);

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
  load(ctx) {}, // TODO: without this, client was sending /subscribe 2 times (recheck)
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
    const accessToken = encodeJwt({ userId: user.id });
    await ctx.sendBack(
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
