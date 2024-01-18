export interface IAddress {
  id: string;
  city: string;
  street: string;
  homeNumber: string;
  postalCode: string;
}

export type AddressData = Omit<IAddress, "id">;
