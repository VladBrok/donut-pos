import { IAddress } from "donut-shared";

export interface IAddressesState {
  addresses: IAddress[];
}

const state: IAddressesState = {
  addresses: [],
};

export default state;
