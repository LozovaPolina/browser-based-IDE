import React from "react";
import ReactDOM from "react-dom/client";

import "bulmaswatch/darkly/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import App from "./App";
import { store } from "./redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
