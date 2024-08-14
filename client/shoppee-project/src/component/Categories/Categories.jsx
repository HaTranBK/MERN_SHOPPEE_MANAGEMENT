import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Smartphone from "../../assets/images/smartphone.jpg";
import Printer from "../../assets/images/printer.jpg";
import Accessories from "../../assets/images/accessories.webp";
import Television from "../../assets/images/television.jpg";
import Speaker from "../../assets/images/speaker.jpg";
import Camera from "../../assets/images/camera.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsState, updateAllproducts } from "../../redux/productsReducer";
import { getCategory } from "../../service/ProductAPICallClient.js";

const Categories = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(productsState);
  const notifyError = (message) => toast.error(`🦄 ${message}`);
  const notifySuccess = (message) => toast.success(`🦄 ${message}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory();
        notifySuccess(response.data.message);
        dispatch(updateAllproducts(response.data.productsFromData));
      } catch (error) {
        // notifyError(error.response.data.message);
        console.log(
          "Error on client side of getting all products in category component: ",
          error
        );
      }
    };

    fetchData();
  }, []);

  console.log("products_ : ", products);

  const renderCategories = () => {
    console.log("banj ddang vao renderCategories: ", products);
    const categoryArr = [
      "Smartphone",
      "Printer",
      "Accessories",
      "Television",
      "Speaker",
      "Camera",
    ];
    return products.map((item, index) => {
      let src_ = { img: Smartphone };
      switch (item.category) {
        case "Smartphone": {
          src_ = { img: Smartphone };
          break;
        }
        case "Printer": {
          src_ = { img: Printer };
          break;
        }
        case "Accessories": {
          src_ = { img: Accessories };
          break;
        }
        case "Television": {
          src_ = { img: Television };
          break;
        }
        case "Speaker": {
          src_ = { img: Speaker };
          break;
        }
        case "Camera": {
          src_ = { img: Camera };
          break;
        }
      }
      return (
        <Link
          to={`/${item.category}`}
          key={item._id}
          className="item_category flex flex-col justify-center items-center"
        >
          <span>{item.category}</span>
          <img
            src={src_.img}
            alt="category_image"
            className="w-36 h-36 object-contain rounded-sm"
          />
        </Link>
      );
    });
  };
  return (
    <div className="container_">
      <Toaster richColors position="top-right" />
      <h2 className="font-semibold text-2xl my-5 mb-8">CATEGORY</h2>
      <div className="categories_container grid grid-cols-6 text-center">
        {renderCategories()}
      </div>
    </div>
  );
};

export default Categories;
