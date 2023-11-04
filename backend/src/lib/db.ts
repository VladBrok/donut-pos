export interface UserModel {
  id: string;
  phone: string;
  passwordHash: string;
  permissions: {
    admin?: boolean;
  };
}

// TODO: use real DB
const mockUsers: UserModel[] = [
  {
    id: "1234",
    phone: "+48000000000",
    passwordHash:
      "$2b$10$yAYLDPCdY4B5FI1y59xfmuG0C4oemTSMnwc6I8O3ZQnIOYB5Cxg6W", // 1234
    permissions: {
      admin: true,
    },
  },
];
export async function findUserByPhone(phone: string) {
  return mockUsers.find((x) => x.phone === phone);
}

export async function findUserById(id: string) {
  return mockUsers.find((x) => x.id === id);
}
