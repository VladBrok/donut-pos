export const EMPLOYEE_ROLES = {
  ADMIN: "admin",
  COOK: "cook",
  WAITER: "waiter",
  COURIER: "courier",
  CLIENT: "client"
} as const;
export const EMPLOYEE_PERMISSIONS = structuredClone(EMPLOYEE_ROLES);
export const EMPLOYEE_ROLES_ARR = Object.values(EMPLOYEE_ROLES);
