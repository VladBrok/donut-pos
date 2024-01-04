import { Server } from "@logux/server";
import {
  ACCESS_DENIED,
  ANONYMOUS,
  USER_EXISTS,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from "donut-shared";
import {
  loggedInAction,
  loginAction,
  signUpAction,
} from "donut-shared/src/actions/auth.js";
import * as clientDb from "../db/modules/client.js";
import * as db from "../db/modules/employees.js";
import { compareWithHash, hash } from "../lib/crypt.js";
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
      const isClient = action.payload.permissions.client;

      const user = isClient
        ? await clientDb.findClientByEmail(action.payload.email)
        : await db.findEmployeeByEmail(action.payload.email);
      if (!user) {
        await server.undo(action, meta, USER_NOT_FOUND);
        return;
      }

      const isPasswordValid = await compareWithHash(
        action.payload.password,
        user.passwordHash || ""
      );
      if (!isPasswordValid) {
        await server.undo(action, meta, WRONG_PASSWORD);
        return;
      }

      const hasExpectedPermission =
        isClient ||
        Object.keys(action.payload.permissions).every(
          (key) => (user as any).permissions[key] === true
        );
      if (!hasExpectedPermission) {
        await server.undo(action, meta, ACCESS_DENIED);
        return;
      }

      const accessToken = encodeJwt({ userId: user.id });

      await ctx.sendBack(
        loggedInAction({
          userId: user.id,
          permissions: isClient ? { client: true } : (user as any).permissions,
          accessToken,
          role: isClient ? undefined : (user as any).role,
        })
      );
    },
  });

  server.type(signUpAction, {
    access(ctx) {
      return ctx.userId === ANONYMOUS.userId;
    },
    async process(ctx, action, meta) {
      const user = await clientDb.findClientByEmail(action.payload.email);
      if (user) {
        await server.undo(action, meta, USER_EXISTS);
        return;
      }

      const created = await clientDb.createClient({
        ...action.payload,
        passwordHash: await hash(action.payload.password),
        registeredAt: new Date().toISOString(),
        isEmailVerified: false,
      });

      const accessToken = encodeJwt({ userId: created.id });

      await ctx.sendBack(
        loggedInAction({
          userId: created.id,
          permissions: { client: true },
          accessToken,
          isNewUser: true,
        })
      );
    },
  });
}
