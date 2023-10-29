import { Server } from "@logux/server";

let count = { value: 0 };

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    fileUrl: import.meta.url,
  })
);

server.auth(({ userId, token }) => {
  return true;
});

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

server.listen();
