export interface IAddress {
  id: string;
  city: string;
  street: string;
  homeNumber: string;
  floor: string;
  postalCode: string;
}

export type AddressData = Omit<IAddress, "id">;
