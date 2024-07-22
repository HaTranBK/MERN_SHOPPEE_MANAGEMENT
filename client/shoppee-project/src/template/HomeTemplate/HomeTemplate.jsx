import React from "react";
import HomeHeader from "../../component/Header/HomeHeader";
import { Outlet } from "react-router-dom";
import Footer from "../../component/Footer/Footer";

const HomeTemplate = () => {
  return (
    <div>
      <HomeHeader />

      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeTemplate;
