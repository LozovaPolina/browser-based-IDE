import {
  applyMiddleware,
  Dispatch,
  legacy_createStore,
  MiddlewareAPI,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
import { ActionTypes } from "./action-types";
import { deleteCell, insertCellBeforeAction } from "./action-creators";
import { Action } from "./actions";

const middlewares = [thunk];

const middlewareEnhancers = applyMiddleware(...middlewares);
export const store = legacy_createStore(
  reducers,
  {},
  composeWithDevTools(middlewareEnhancers),
);
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(insertCellBeforeAction({ id: null, type: "code" }));
store.dispatch(deleteCell("5m4"));
