import { ActionType } from "../actions/squareActions";

const initState = {
  history: [Array(9).fill(null)],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function cartReducer(state = initState, action: any) {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      return {
        ...action.payload,
      };
    case ActionType.CLEAR_ALL:
      return [];
    default:
      return state;
  }
}
