export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  registeredAt: string;
  passwordHash: string;
}
