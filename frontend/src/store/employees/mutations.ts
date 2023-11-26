import {
  employeeCreatedAction,
  employeeDeletedAction,
  employeeUpdatedAction,
  loadEmployeesAction,
} from "donut-shared/src/actions/employees";
import { MutationTree } from "vuex";
import { IEmployeesState } from "./state";

const mutation: MutationTree<IEmployeesState> = {
  load(state: IEmployeesState, action: ReturnType<typeof loadEmployeesAction>) {
    state.employees = action.payload.employees;
  },

  deleted(
    state: IEmployeesState,
    action: ReturnType<typeof employeeDeletedAction>
  ) {
    state.employees = state.employees.filter((x) => x.id !== action.payload.id);
  },

  created(
    state: IEmployeesState,
    action: ReturnType<typeof employeeCreatedAction>
  ) {
    state.employees.push(action.payload);
  },

  updated(
    state: IEmployeesState,
    action: ReturnType<typeof employeeUpdatedAction>
  ) {
    const employee = state.employees.find((x) => x.id === action.payload.id);
    if (employee) {
      Object.assign(employee, action.payload);
    }
  },
};

export default mutation;
