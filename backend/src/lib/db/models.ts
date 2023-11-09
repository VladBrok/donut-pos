export interface EmployeeModel {
  id: string;
  phone: string;
  passwordHash: string;
  permissions: {
    admin?: boolean;
  };
}
