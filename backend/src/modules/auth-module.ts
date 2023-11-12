import { Server } from "@logux/server";
import {
  ANONYMOUS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
  loggedInAction,
  loginAction,
} from "donut-shared";
import { compareWithHash } from "../lib/crypt.js";
import * as db from "../lib/db/index.js";
import { decodeJwt, encodeJwt } from "../lib/jwt.js";

export default function authModule(server: Server) {
  server.auth(({ userId, token }) => {
    if (userId === ANONYMOUS.userId) {
      return true;
    }

    const jwtPayload = decodeJwt(token);
    return jwtPayload?.userId === userId;
  });

  server.type(loginAction, {
    access(ctx) {
      return ctx.userId === ANONYMOUS.userId;
    },
    async process(ctx, action, meta) {
      const user = await db.findEmployeeByPhone(action.payload.phone);
      if (!user) {
        await server.undo(action, meta, USER_NOT_FOUND);
        return;
      }

      const isPasswordValid = await compareWithHash(
        action.payload.password,
        user.passwordHash
      );
      if (!isPasswordValid) {
        await server.undo(action, meta, WRONG_PASSWORD);
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
}