import axios from "axios";
import React, { useEffect, useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DivideSign from "../../utils/DivideSign";

const ItemInfor = ({ pathname }) => {
  const [inforItem, setInforItem] = useState({
    image: "",
    name: "",
    price: "",
    description: "",
    information: "",
    thumb: "",
  });
  const [quantity, setQuantity] = useState(1);
  const formattedPathname = pathname.replace(/-/g, " ");
  useEffect(() => {
    const fetchSingleproduct = async () => {
      try {
        const Products = await axios.get(
          "http://localhost:8000/api/v1/products/get-product",
          {
            params: {
              productname: pathname,
            },
          }
        );
        // console.log("data of get single product: ", Products.data.AllProducts);
        const matchedProductsArr = [];
        Products.data.AllProducts.forEach((item) => {
          Object.entries(item).forEach(([key, value]) => {
            {
              if (key !== "_id" && key !== "variants" && key !== "category") {
                // console.log("key - value: ", key, value.name);
                if (value.name === formattedPathname) {
                  console.log("matched name: ", value.name);
                  matchedProductsArr.push(value);
                }
              }
            }
          });
        });
        console.log("matched products: ", matchedProductsArr);
        setInforItem(matchedProductsArr[0]);
      } catch (error) {
        console.log("error from getting single product: ", error);
      }
    };
    fetchSingleproduct();
  }, []);

  return (
    <div className="container_ flex  h-96">
      <div className="h-44 w-1/4 h-4/5">
        <img
          src={inforItem.thumb}
          alt="anh chi tiet"
          className="w-full h-full object-contain"
        />
        {/* //bo cai carouesel vao day, chua them hinh anh ve san pham */}
      </div>
      <div>
        <span className="block">{inforItem.name}</span>
        {/* bo them danh gia (5 sao), da mua */}
        <div>
          <span className="py-3">
            <span className="text-orange-500">5.0</span>
            <FontAwesomeIcon icon={faStar} className="text-orange-500" />
            <FontAwesomeIcon icon={faStar} className="text-orange-500" />
            <FontAwesomeIcon icon={faStar} className="text-orange-500" />
            <FontAwesomeIcon icon={faStar} className="text-orange-500" />
            <FontAwesomeIcon icon={faStar} className="text-orange-500" />
          </span>
          <DivideSign />
          <span>100 Đánh Giá</span>
          <DivideSign />
          <span>8 Đã Bán</span>
        </div>

        <span className="py-5 px-5 bg-gray-200 block">
          Gia: <span className="text-orange-500">{inforItem.price}</span>{" "}
        </span>
        <div className="returnPolicy flex items-center gap-3 w-4/5">
          <span>
            Chính Sách Trả <br /> Hàng
          </span>
          <img
            src={
              "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg"
            }
            alt=""
            className="w-4"
          />
          <span>Trả hàng 15 ngày</span>
        </div>
        <div className="delivery">
          <span>Van chuyen</span>
          <span>Mien phi van chuyen</span>
        </div>
        <div className="option">
          <span>Loai</span>
          <div className="option_image">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
        <span>So luong</span>
        <div className="button grid grid-cols-2 gap-3">
          <button className="btn_cart px-4 py-3 rounded-md text-orange-500">
            Them vao gio hang
          </button>
          <button className="btn_buy px-4 py-3 bg-orange-600 rounded-md hover:bg-orange-500">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemInfor;
