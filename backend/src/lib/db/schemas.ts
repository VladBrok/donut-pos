import { employee, role } from "../../../migrations/schema.js";

export type SelectEmployeeSchema = {
  [employee._.name]: typeof employee.$inferSelect;
  [role._.name]: typeof role.$inferSelect | null;
};
