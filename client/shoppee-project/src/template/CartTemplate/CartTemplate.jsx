import React from "react";
import HeaderCart from "../../component/Header/HeaderCart";
import { Outlet } from "react-router-dom";
import Footer from "../../component/Footer/Footer";

const CartTemplate = () => {
  return (
    <div>
      <HeaderCart />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CartTemplate;
