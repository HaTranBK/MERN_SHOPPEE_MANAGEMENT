import React from "react";
import CategoryBasedProducts from "../Products/CategoryBasedProducts";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import InforPageBody from "../InforPage/InforPageBody";
import { categoryArray } from "../../utils/CategoryArray";
import CartTemplate from "../../template/CartTemplate/CartTemplate";

const CategoryBasedBody = () => {
  const { pathname } = useParams();
  console.log(pathname);
  const renderComponent = () => {
    if (categoryArray().includes(pathname))
      return <CategoryBasedProducts pathname={pathname} />;
    // else if (pathname === "cart") {
    //   return <CartTemplate />;
    else return <InforPageBody pathname={pathname} />;
  };

  return <div>{renderComponent()}</div>;
};

export default CategoryBasedBody;
