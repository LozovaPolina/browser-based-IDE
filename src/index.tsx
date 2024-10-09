import React from "react";
import ReactDOM from "react-dom/client";

import "bulmaswatch/darkly/bulmaswatch.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector("#root")!);

root.render(
  <>
    <App />
  </>,
);
