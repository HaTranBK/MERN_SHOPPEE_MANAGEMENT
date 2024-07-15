import { useState } from "react";
import "../../css/app.css";
import { Route, Routes } from "react-router-dom";
import SignInUpTemplate from "./template/SignInUpTemplate/SignInUpTemplate";
import SignIn from "./component/SignIn/SignIn";
import TemplateSign from "./component/SignUp/TemplateSign";
import MainForm from "./component/SignUp/MainForm";
import HomeHeader from "./component/Header/HomeHeader";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeHeader />} />
      <Route path="/pre-process" element={<SignInUpTemplate />}>
        <Route path="sign" element={<TemplateSign />}>
          <Route path="signup" element={<MainForm />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
