import { loadEmployeesAction } from "donut-shared/src/actions/employees";

export interface IEmployeesState {
  employees: ReturnType<typeof loadEmployeesAction>["payload"]["employees"];
}

const state: IEmployeesState = {
  employees: [],
};

export default state;
