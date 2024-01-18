import { AddressData } from "donut-shared";
import { capitalize } from "src/lib/capitalize";

export function makeGoogleMapSearchQuery(data: AddressData) {
  return `${data.city} ${data.street} ${data.homeNumber} ${data.postalCode}`.trim();
}

export function formatAddress(data: AddressData) {
  return `ul. ${capitalize(data.street)} ${data.homeNumber}, ${
    data.postalCode
  } ${capitalize(data.city)}`;
}
