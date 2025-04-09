import React from "react";
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <>
      <HeaderAdmin />
      {/* <Menu /> */}
      <div className="flex gap-10 mt-10">
        <Navigation />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomeTemplate;
