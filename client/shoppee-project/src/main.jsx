import React from "react";
import ReactDOM from "react-dom/client";
import Client from "./App.jsx";
import "./index.css";
import "antd/dist/reset.css"; // For Ant Design v5
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Client />
    </Provider>
  </BrowserRouter>
);
