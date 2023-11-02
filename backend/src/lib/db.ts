export interface UserModel {
  id: string;
  phone: string;
  passwordHash: string;
}

// TODO: use real DB
const mockUsers: UserModel[] = [
  {
    id: "1234",
    phone: "+48000000000",
    passwordHash: "1234",
  },
];
const refreshTokens: string[] = [];

export async function findUserByPhone(phone: string) {
  return mockUsers.find((x) => x.phone === phone);
}

export async function findUserById(id: string) {
  return mockUsers.find((x) => x.id === id);
}

export async function addRefreshToken(token: string, userId: string) {
  refreshTokens.push(token);
}

export async function deleteRefreshTokenOfUser(userId: string) {
  refreshTokens.splice(0, refreshTokens.length);
}
