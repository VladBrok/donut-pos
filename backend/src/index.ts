import { Server } from "@logux/server";
import * as db from "./db/index.js";
import authModule from "./modules/auth-module.js";
import dishCategoriesModule from "./modules/dish-categories-module.js";
import dishesModule from "./modules/dishes-module.js";
import employeesModule from "./modules/employees.js";
import modificationsModule from "./modules/modifications.js";

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    fileUrl: import.meta.url,
  })
);
db.connect();

authModule(server);
dishCategoriesModule(server);
dishesModule(server);
modificationsModule(server);
employeesModule(server);

server.listen();
