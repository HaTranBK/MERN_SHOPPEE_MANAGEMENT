import React from "react";
import { useRoutes } from "react-router-dom";
import HomeTemplate from "../component/HomeTemplate/HomeTemplate";
import AdminFullInformations from "../component/AdminInFormation/AdminFullInformations";
import UserList from "../component/UserList/UserList";
import ProductList from "../component/ProductList/ProductList";
import AdminList from "../component/AdminList/AdminList";

const useRouterCustom = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomeTemplate />,
      children: [
        {
          path: "/profile",
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
  ]);
  return routes;
};

export default useRouterCustom;
