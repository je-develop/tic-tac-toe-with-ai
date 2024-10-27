import { createStore, combineReducers, applyMiddleware } from "redux";
import cartReducer from "./reducers/squareReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({ square: cartReducer });

const initialState = {
  square: { history: [] },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
