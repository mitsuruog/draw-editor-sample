import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { App } from "./features/App";
import { store } from "./shared/store";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
