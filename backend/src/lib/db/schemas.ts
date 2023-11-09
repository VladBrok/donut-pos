import { employee, role } from "../../../drizzle/schema.js";

export type SelectEmployeeSchema = {
  [employee._.name]: typeof employee.$inferSelect;
  [role._.name]: typeof role.$inferSelect | null;
};
