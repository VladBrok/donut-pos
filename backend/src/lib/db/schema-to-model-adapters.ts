import { EmployeeModel } from "./models.js";
import { SelectEmployeeSchema } from "./schemas.js";

export const employeeAdapter = (
  data?: SelectEmployeeSchema | null
): EmployeeModel | null => {
  if (!data) {
    return null;
  }

  return {
    id: data.employee.id,
    passwordHash: data.employee.passwordHash || "",
    phone: data.employee.phone || "",
    permissions: {
      admin: data.role?.codeName === "admin",
    },
  };
};
