import React from "react";
import { Link } from "react-router-dom";

const DetailItem = ({ productInfo }) => {
  const { thumb, price, name } = productInfo;
  return (
    <Link
      className="detail_item text-center"
      to={`/${name.replace(/ /g, "-")}`}
    >
      <img src={thumb} alt="anh product" />
      <div className="infor_item px-2 mt-2 pb-3">
        <span className="nameItem text-sm">{name}</span>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="price flex justify-between pb-3 px-2">
        <span className="text-red-500">{price}</span>
        <span className="text-sm">Bought: 100k</span>
      </div>
    </Link>
  );
};

export default DetailItem;
