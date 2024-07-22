import React, { useCallback, useEffect, useState } from "react";
import CategoryBasedProducts from "../Products/CategoryBasedProducts";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import InforPageBody from "../InforPage/InforPageBody";
import { categoryArray } from "../../utils/CategoryArray";

const CategoryBasedBody = () => {
  const { pathname } = useParams();
  console.log(pathname);
  // 0 - not show any component
  // 1 - show <CategoryBasedBody />
  // 2 - <InforPageBody />+
  const [showComponent, setShowComponent] = useState(0);
  const preProcessingRenderComponent = useCallback(() => {
    console.log("include: ", categoryArray().includes(pathname));
    if (categoryArray().includes(pathname)) setShowComponent(1);
    else if (!categoryArray().includes(pathname)) setShowComponent(2);
  }, [pathname]);

  useEffect(() => {
    preProcessingRenderComponent();
  }, [pathname]);
  console.log("showComponent: ", showComponent);
  const renderComponent = () => {
    if (showComponent == 0) return "";
    if (showComponent == 1) {
      return <CategoryBasedProducts />;
    }
    return <InforPageBody pathname={pathname} />;
  };
  return <div>{renderComponent()}</div>;
};

export default CategoryBasedBody;
