import { CrossTabClient } from "@logux/client";
import { MemoryStore } from "@logux/core";
import { ANONYMOUS } from "donut-shared";
import { getUserFromStorage } from "../local-storage";

export function createClient() {
  return new CrossTabClient({
    server:
      process.env.NODE_ENV === "development"
        ? "ws://localhost:31337"
        : "ws://localhost:31337",
    // : "wss://logux.example.com",
    subprotocol: "1.0.0",
    userId: getUserFromStorage()?.userId || ANONYMOUS.userId,
    token: getUserFromStorage()?.accessToken || "",
    store: new MemoryStore(),
  });
}
