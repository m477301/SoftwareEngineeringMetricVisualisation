import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

import store from "./store";
import { Provider } from "react-redux";

axios.defaults.baseURL = process.env["REACT_APP_SERVER_URL"];
axios.defaults.headers.common["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
