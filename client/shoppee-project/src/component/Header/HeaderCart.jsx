import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import UserInformations from "../UserInformations/UserInformations";
import { faSearch, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HeaderCart = () => {
  return (
    <div>
      <div>
        <div className="headerCart-Top py-2">
          <div className="container_ header_cart_container flex justify-between">
            <div className="headerCart-Top-left flex justify-center items-center space-x-2">
              <span className="text-white">Kết nối</span>
              <a href="https://www.facebook.com/ShopeeVN" target="blank">
                <FontAwesomeIcon icon={faFacebook} className="text-white" />
              </a>
              <a href="https://instagram.com/Shopee_VN" target="blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-white text-lg"
                />
              </a>
            </div>
            <div>
              <UserInformations />
            </div>
          </div>
        </div>
        <div className="headerCart-Bottom">
          <div className="container_ flex justify-between items-center py-8">
            <div className="flex items-center justify-center">
              <Link to="/">
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className="text-5xl text-orange-600 me-3"
                />
                <span className="text-4xl text-orange-600 text-semibold me-3 ">
                  Shoppe
                </span>
              </Link>
              <span className="text-2xl text-semibold pt-3 text-orange-600 me-3">
                |
              </span>
              <span className="text-2xl text-orange-600 inline-block mt-4">
                Giỏ hàng
              </span>
            </div>
            <div className="w-2/5 flex">
              <input
                type="text"
                placeholder="Tìm kiếm mọi thứ bạn thích..."
                className="py-3  ps-3 border-2 focus-visible:border-orange-500 w-full border-orange-500"
              />
              <button
                className="w-14 h-12 bg-orange-500 text-center hover:bg-orange-400"
                style={{ lineHeight: "50px" }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-lg text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
