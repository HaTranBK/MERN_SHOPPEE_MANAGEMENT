import { useEffect, useState } from "react";
import "../../css/app.css";
import { Route, Routes } from "react-router-dom";
import SignInUpTemplate from "./template/SignInUpTemplate/SignInUpTemplate";
import SignIn from "./component/SignIn/SignIn";
import TemplateSign from "./component/SignUp/TemplateSign";
import MainForm from "./component/SignUp/MainForm";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import BodyHome from "./component/BodyHome/BodyHome";
import CategoryBasedBody from "./component/Categories/CategoryBasedBody";
import CartTemplate from "./template/CartTemplate/CartTemplate";
import Cart from "./component/Item/Cart";
import NotFound from "./component/NotFound/NotFound";
import Admin from "../../../admin/src/App";
import { getLocalStorageItem } from "./utils/localStorage";
function Client() {
  console.log("client");
  const renderAdminClient = () => {
    const Userrole = getLocalStorageItem("User");
    const AdminRole = getLocalStorageItem("Admin");
    if (Userrole?.role === "User" || (!AdminRole && !Userrole)) {
      console.log("vào user");
      return (
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route index element={<BodyHome />} />
            <Route path="/:pathname" element={<CategoryBasedBody />} />
            <Route path="/not-found" element={<NotFound />} />
          </Route>
          <Route path="/cart" element={<CartTemplate />}>
            <Route index element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/pre-process" element={<SignInUpTemplate />}>
            <Route path="sign" element={<TemplateSign />}>
              <Route path="signup" element={<MainForm />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      );
    }

    if (AdminRole) {
      console.log("vào admin");
      return <Admin />;
    }
    console.log("ngoài .............");
  };
  return renderAdminClient();
}

export default Client;
