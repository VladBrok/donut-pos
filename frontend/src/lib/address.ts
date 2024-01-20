import { IAddress } from "donut-shared";
import { capitalize } from "src/lib/capitalize";

export function makeGoogleMapSearchQuery(data: IAddress) {
  return encodeURIComponent(
    `${data.city} ${data.street} ${data.homeNumber} ${data.postalCode}`.trim()
  );
}

export function formatAddress(data?: IAddress | null) {
  if (!data) {
    return "";
  }

  return `ul. ${capitalize(data.street)} ${data.homeNumber}, ${
    data.postalCode
  } ${capitalize(data.city)}`;
}
