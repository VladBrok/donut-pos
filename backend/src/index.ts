import { Server } from "@logux/server";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { LogType, setLogger } from "donut-shared/src/lib/log.js";
import addressesModule from "src/modules/addresses-module.js";
import cashPaymentRequestsModule from "src/modules/cash-payment-requests-module.js";
import clientsModule from "src/modules/clients-module.js";
import dashboardModule from "src/modules/dashboard-module.js";
import diningTablesModule from "src/modules/dining-tables-module.js";
import logModule from "src/modules/log-module.js";
import ordersModule from "src/modules/orders-module.js";
import salePointsModule from "src/modules/sale-points-module.js";
import * as winston from "winston";
import "winston-daily-rotate-file";
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
dashboardModule(server);
logModule(server);

const logger = winston.createLogger({
  format: winston.format.prettyPrint(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
    }),
  ],
});

setLogger((date, type, ...messages) => {
  const message = messages
    .map((x) =>
      typeof x === "object" || typeof x === "boolean" || x == null
        ? JSON.stringify(x)
        : x
    )
    .join(" ");
  logger.log(
    type === LogType.Error ? "error" : type === LogType.Info ? "info" : "warn",
    message,
    {
      date: date,
    }
  );
});

server.listen();
