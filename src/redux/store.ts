import {
  applyMiddleware,
  Dispatch,
  legacy_createStore,
  MiddlewareAPI,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import reducers from "./reducers";

import { insertCellBeforeAction } from "./action-creators";

const middlewares = [thunk];

const middlewareEnhancers = applyMiddleware(...middlewares);
export const store = legacy_createStore(
  reducers,
  {},
  composeWithDevTools(middlewareEnhancers),
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

store.subscribe(() => console.log(store.getState()));
store.dispatch(insertCellBeforeAction({ id: null, type: "code" }));
store.dispatch(insertCellBeforeAction({ id: null, type: "text" }));
store.dispatch(insertCellBeforeAction({ id: null, type: "code" }));
