import { loadModificationsAction } from "donut-shared";

export interface IModificationsState {
  modifications: ReturnType<
    typeof loadModificationsAction
  >["payload"]["modifications"];
}

const state: IModificationsState = {
  modifications: [],
};

export default state;
