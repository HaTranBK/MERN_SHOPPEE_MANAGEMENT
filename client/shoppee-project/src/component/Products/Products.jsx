import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productsState } from "../../redux/productsReducer";
import DetailItem from "../Item/DetailItem";

const Products = () => {
  const { products } = useSelector(productsState);

  const renderDetailedProduct = () => {
    const data = products.map((item) => {
      return Object.entries(item).map(([key, value]) => {
        return { [key]: value };
      });
    });

    return data.map((item) => {
      return item.map((detailItem, index) => {
        if (index != 1 && index != 0 && index != item.length - 1) {
          //   console.log("huhuh: ", Object.values(detailItem));
          return (
            <DetailItem
              productInfo={Object.values(detailItem)[0]}
              key={index}
            />
          );
        }
      });
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center text-red-500 my-8">
        Current Products
      </h2>
      <div className="bg-red-500">
        <div className="container_ bg-white px-1">
          <div className="grid grid-cols-4 gap-2 products">
            {renderDetailedProduct()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
