import { Server } from "@logux/server";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import addressesModule from "src/modules/addresses-module.js";
import cashPaymentRequestsModule from "src/modules/cash-payment-requests-module.js";
import clientsModule from "src/modules/clients-module.js";
import diningTablesModule from "src/modules/dining-tables-module.js";
import ordersModule from "src/modules/orders-module.js";
import salePointsModule from "src/modules/sale-points-module.js";
import * as db from "./db/index.js";
import authModule from "./modules/auth-module.js";
import { default as dishCategoriesModule } from "./modules/dish-categories-module.js";
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
diningTablesModule(server);
cashPaymentRequestsModule(server);
clientsModule(server);
addressesModule(server);
salePointsModule(server);

server.listen();
