import { useState } from "react";
import "../../css/app.css";
import { Route, Routes } from "react-router-dom";
import SignInUpTemplate from "./template/SignInUpTemplate/SignInUpTemplate";
import SignIn from "./component/SignIn/SignIn";
import TemplateSign from "./component/SignUp/TemplateSign";
import MainForm from "./component/SignUp/MainForm";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import BodyHome from "./component/BodyHome/BodyHome";
import CategoryBasedBody from "./component/Categories/CategoryBasedBody";
import InforPageBody from "./component/InforPage/InforPageBody";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<BodyHome />} />
        <Route path="/:pathname" element={<CategoryBasedBody />} />
      </Route>
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
