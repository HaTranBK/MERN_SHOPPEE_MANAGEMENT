import React from "react";
import { useRoutes } from "react-router-dom";
import HomeTemplate from "../component/HomeTemplate/HomeTemplate";
import AdminFullInformations from "../component/AdminInFormation/AdminFullInformations";
import UserList from "../component/UserList/UserList";
import ProductList from "../component/ProductList/ProductList";
import AdminList from "../component/AdminList/AdminList";
import SignIn from "../../../client/shoppee-project/src/component/SignIn/SignIn";
import TemplateSign from "../../../client/shoppee-project/src/component/SignUp/TemplateSign";
import SignInUpTemplate from "../../../client/shoppee-project/src/template/SignInUpTemplate/SignInUpTemplate";
import MainForm from "../../../client/shoppee-project/src/component/SignUp/MainForm";

const useRouterCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        {
          path: "profile",
          element: <AdminFullInformations />,
        },
        {
          path: "user-list",
          element: <UserList />,
        },
        {
          path: "product-list",
          element: <ProductList />,
        },
        {
          path: "admin-list",
          element: <AdminList />,
        },
      ],
    },
    {
      path: "/pre-process",
      element: <SignInUpTemplate />,
      children: [
        {
          path: "sign",
          element: <TemplateSign />,
          children: [
            {
              path: "signup",
              element: <MainForm />,
            },
            {
              path: "signin",
              element: <SignIn />,
            },
          ],
        },
      ],
    },
  ]);
  return routes;
};

export default useRouterCustom;
