import { lazy, Suspense, useEffect, useState } from "react";
import "../../css/app.css";
import { Route, Routes } from "react-router-dom";
import { getLocalStorageItem } from "./utils/localStorage";
const SignInUpTemplate = lazy(() =>
  import("./template/SignInUpTemplate/SignInUpTemplate")
);
const SignIn = lazy(() => import("./component/SignIn/SignIn"));
const TemplateSign = lazy(() => import("./component/SignUp/TemplateSign"));
const MainForm = lazy(() => import("./component/SignUp/MainForm"));
const HomeTemplate = lazy(() => import("./template/HomeTemplate/HomeTemplate"));
const BodyHome = lazy(() => import("./component/BodyHome/BodyHome"));
const CategoryBasedBody = lazy(() =>
  import("./component/Categories/CategoryBasedBody")
);
const CartTemplate = lazy(() => import("./template/CartTemplate/CartTemplate"));
const Cart = lazy(() => import("./component/Item/Cart"));
const NotFound = lazy(() => import("./component/NotFound/NotFound"));
const Admin = lazy(() => import("../../../admin/src/App"));

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
  return (
    <Suspense fallback={<div>Loading...</div>}>{renderAdminClient()}</Suspense>
  );
}

export default Client;
