export const ActionType = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  CLEAR_ALL: "CLEAR_ALL",
};

export const addPlayerGame = (item: unknown) => {
  return {
    type: ActionType.ADD_ITEM,
    payload: item,
  };
};

export const removeItem = (index: number) => ({
  type: ActionType.REMOVE_ITEM,
  payload: index,
});

export const clearItems = () => ({
  type: ActionType.CLEAR_ALL,
  payload: [],
});
