import React from "react";
import BreadCrum from "../BreadCrumbs/BreadCrum";
import ItemInfor from "../Item/ItemInfor";

const InforPageBody = ({ pathname }) => {
  console.log("pathname in inforpagebody: ", pathname);
  return (
    <div>
      <BreadCrum />
      <ItemInfor pathname={pathname} />
    </div>
  );
};

export default InforPageBody;
