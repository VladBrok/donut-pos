import { AddressData } from "donut-shared";

export function makeGoogleMapSearchQuery(data: AddressData) {
  return `${data.city} ${data.street} ${data.homeNumber} ${data.postalCode}`.trim();
}
