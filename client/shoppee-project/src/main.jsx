import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Link to="/pre-process/sign/signup">SignUp</Link>
      <br />
      <Link to="/pre-process/sign/signin">SignIn</Link>
      <App />
    </Provider>
  </BrowserRouter>
);
