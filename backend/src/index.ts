import { Server } from "@logux/server";

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

server.listen();
