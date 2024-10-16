import { applyMiddleware, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import reducers from "./reducers";

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
