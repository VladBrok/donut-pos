import {
  addDishToCurrentOrderAction,
  assert,
  decrementDishInCurrentOrderAction,
  removeDishFromCurrentOrderAction,
  updateCurrentOrderCommentAction,
  updateCurrentOrderTableNumberAction,
} from "donut-shared";
import {
  updateCurrentOrderAddressAction,
  updateCurrentOrderClientFirstNameAction,
  updateCurrentOrderClientPhoneAction,
  updateCurrentOrderTypeAction,
  updatePreviousOrderAction,
} from "donut-shared/src/actions/current-order";
import { getUniqueDishId } from "src/lib/get-unique-dish-id";
import { MutationTree } from "vuex";
import { ICurrentOrderState, makeEmptyOrder } from "./state";

const mutation: MutationTree<ICurrentOrderState> = {
  addDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof addDishToCurrentOrderAction>
  ) {
    if (!state.order) {
      state.order = makeEmptyOrder();
    }

    const uniqueId = getUniqueDishId(action.payload.dish);
    const existingIdx = state.order.dishes.findIndex(
      (x) => getUniqueDishId(x) === uniqueId
    );

    if (existingIdx > -1) {
      state.order.dishes[existingIdx].count++;
    } else {
      state.order.dishes.push({
        ...action.payload.dish,
      });
    }
  },

  decrementDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof decrementDishInCurrentOrderAction>
  ) {
    assert(state.order, "Cannot decrement dish on empty order");

    const uniqueId = getUniqueDishId(action.payload.dish);
    const existingIdx = state.order.dishes.findIndex(
      (x) => getUniqueDishId(x) === uniqueId
    );

    if (existingIdx > -1) {
      assert(
        state.order.dishes[existingIdx].count > 1,
        "Cannot decrement dish to 0"
      );
      state.order.dishes[existingIdx].count--;
    }
  },

  removeDish(
    state: ICurrentOrderState,
    action: ReturnType<typeof removeDishFromCurrentOrderAction>
  ) {
    assert(state.order, "Cannot remove dish from empty order");

    state.order.dishes = state.order.dishes.filter(
      (x) => x.dishIdInOrder !== action.payload.dishIdInOrder
    );
  },

  clear(state: ICurrentOrderState) {
    state.order = null;
  },

  updateComment(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderCommentAction>
  ) {
    assert(
      state.order,
      "Cannot update current order comment when order is empty"
    );

    state.order.comment = action.payload.comment;
  },

  updateClientPhone(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderClientPhoneAction>
  ) {
    assert(
      state.order,
      "Cannot update current order phone when order is empty"
    );
    state.order.client = state.order.client || {
      id: "",
      firstName: "",
      phone: "",
    };
    state.order.client.phone = action.payload.phone;
  },

  updateClientFirstName(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderClientFirstNameAction>
  ) {
    assert(
      state.order,
      "Cannot update current order client first name when order is empty"
    );
    state.order.client = state.order.client || {
      id: "",
      firstName: "",
      phone: "",
    };
    state.order.client.firstName = action.payload.firstName;
  },

  updateType(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderTypeAction>
  ) {
    assert(state.order, "Cannot update current order type when order is empty");

    state.order.type = action.payload.type;
  },

  updateTableNumber(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderTableNumberAction>
  ) {
    assert(
      state.order,
      "Cannot update current order table when current order is empty"
    );

    state.order.table = action.payload.table;
  },

  updateAddress(
    state: ICurrentOrderState,
    action: ReturnType<typeof updateCurrentOrderAddressAction>
  ) {
    assert(
      state.order,
      "Cannot update current order address when current order is empty"
    );

    state.order.address = action.payload.address;
  },

  updatePrevious(
    state: ICurrentOrderState,
    action: ReturnType<typeof updatePreviousOrderAction>
  ) {
    state.previous = action.payload.order;
  },
};

export default mutation;
