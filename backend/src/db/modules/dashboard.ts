import { IAdminDashboardData } from "donut-shared";
import { sql } from "drizzle-orm";
import { adminDashboardAdapter } from "src/db/schema-to-model-adapters.js";
import { client, order } from "../../../migrations/schema.js";
import { db } from "../index.js";

export async function getAdminDashboardData(): Promise<IAdminDashboardData> {
  const [orderTypes, orderCount, clientCount] = await Promise.all([
    db
      .select({
        type: order.type,
        count: sql`count('*')`.mapWith(Number),
      })
      .from(order)
      .groupBy(order.type),
    db
      .select({
        count: sql`count('*')`.mapWith(Number),
      })
      .from(order),
    db
      .select({
        count: sql`count('*')`.mapWith(Number),
      })
      .from(client),
  ]);

  return adminDashboardAdapter({
    orderTypes: orderTypes,
    orderCount: orderCount[0]?.count || 0,
    clientCount: clientCount[0]?.count || 0,
  });
}
