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

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
