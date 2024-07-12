import { useState } from "react";
import SignUp from "./component/SignUp/SignUp";
import "../../css/app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import SignInUpTemplate from "./template/SignInUpTemplate/SignInUpTemplate";
import SignIn from "./component/SignIn/SignIn";
function App() {
  return (
    <Routes>
      <Route path="/pre-step" element={<SignInUpTemplate />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
