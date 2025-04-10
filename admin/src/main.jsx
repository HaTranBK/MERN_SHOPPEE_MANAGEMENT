import React from "react";
import ReactDOM from "react-dom/client";
import Admin from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Admin />
    </Provider>
  </BrowserRouter>
);
