import { Server } from "@logux/server";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import {
  IOrder,
  orderPaidSuccessAction,
} from "donut-shared/src/actions/orders.js";
import ordersModule from "src/modules/orders-module.js";
import * as db from "./db/index.js";
import authModule from "./modules/auth-module.js";
import dishCategoriesModule from "./modules/dish-categories-module.js";
import dishesModule from "./modules/dishes-module.js";
import employeesModule from "./modules/employees-module.js";
import modificationsModule from "./modules/modifications-module.js";
import rolesModule from "./modules/roles-module.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

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
rolesModule(server);
ordersModule(server);

// TODO:
server.http(async (req, res) => {
  if (req.url === "/endpoint") {
    await server.process(
      orderPaidSuccessAction({
        order: {} as IOrder,
      })
    );
    res.end("wow");
    return;
  }
  res.end("not found");
});

server.listen();
