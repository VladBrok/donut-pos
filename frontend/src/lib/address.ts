import { IAddress } from "donut-shared";
import { capitalize } from "src/lib/capitalize";

export function makeGoogleMapSearchQuery(data: IAddress) {
  return `${data.city} ${data.street} ${data.homeNumber} ${data.postalCode}`.trim();
}

export function formatAddress(data: IAddress) {
  return `ul. ${capitalize(data.street)} ${data.homeNumber}, ${
    data.postalCode
  } ${capitalize(data.city)}`;
}
