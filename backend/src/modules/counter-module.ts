import { Server } from "@logux/server";
import * as db from "../lib/db/index.js";

// TODO: delete

export default function counterModule(server: Server) {
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
}
