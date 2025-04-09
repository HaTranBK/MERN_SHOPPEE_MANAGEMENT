import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateAccount,
  updateIsLogIn,
  updateUserInformation,
  userState,
} from "../../redux/userReducer";
import UserInformations from "../UserInformations/UserInformations";
import axios from "axios";
import DivideSign from "../../utils/DivideSign";
import { ConfigProvider, Popover } from "antd";
import CustomModal from "../Modal/Modal";
import { getUserAuthenticated } from "../../service/userAPICallClient";
import { setLocalStorageItem } from "../../utils/localStorage";

const HomeHeader = () => {
  const { islogin } = useSelector(userState);
  console.log("isLogin: ", islogin);
  const dispatch = useDispatch();
  const { cart } = useSelector(userState);
  const popover = document.querySelector(".popover_cart");
  const navigate = useNavigate();
  let hideTimeOut, isHovering;

  const content = () => {
    if (cart.length != 0)
      return (
        <div>
          <span className="p-4 inline-block text-gray-300">
            Sản phẩm mới thêm
          </span>
          <div className="max-h-64 overflow-y-auto">
            {cart.map((item) => {
              return (
                <div
                  className="flex justify-between items-center w-full border_item_cart py-1 hover:bg-gray-200"
                  key={item.id}
                >
                  <Link to={`/${item.name.replace(/ /g, "-")}`}>
                    <img src={item.thumb} alt="thumb" className="w-16 ms-2" />
                  </Link>
                  <span className="text-orange-600">{item.price}</span>
                </div>
              );
            })}
          </div>
          <div className="text-right mt-1">
            <button
              className="px-3 py-2 bg-orange-600 text-white hover:bg-orange-500"
              onClick={() => {
                navigate("/cart");
              }}
            >
              Xem Giỏ Hàng
            </button>
          </div>
        </div>
      );
    else {
      return (
        <div className="flex flex-col justify-center items-center mt-28">
          <div className="empty_cart w-20 h-20"></div>
          <span className="text-gray-300">Giỏ hàng hiện đang trống !</span>
        </div>
      );
    }
  };

  const renderSignInSignUp = () => {
    if (islogin) {
      return <UserInformations />;
    }
    return (
      <>
        <Link to="/pre-process/sign/signup">Đăng Ký</Link>
        <DivideSign />
        <Link to="/pre-process/sign/signin">Đăng Nhập</Link>
      </>
    );
  };

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await getUserAuthenticated();
        dispatch(updateIsLogIn(true));
        dispatch(updateUserInformation(response.data.user));
        setLocalStorageItem("User", response.data.user);
        return response.data;
      } catch (error) {
        console.log("loi: ", error);
        if (
          error.response.data.message ===
          "Json Web Token is expired, Try again !"
        )
          //can dieu huong nguoi dung nhan dang xuat hay gi do de log out
          localStorage.removeItem("user");
      }
    };
    authenticate();
  }, []);

  console.log("bạn vào homeheader! ");
  return (
    <header className=" py-6" style={{ backgroundColor: "#FB5730" }}>
      <div className="header_home container_">
        <div className="flex justify-end gap-2 mb-5 text-white ">
          {renderSignInSignUp()}
        </div>
        <div className=" bottom_header flex items-center justify-around  gap-10">
          <Link to="/">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="text-5xl text-white me-3"
            />
            <span className="text-4xl text-white text-semibold me-3 ">
              Shoppe
            </span>
          </Link>
          <div className="flex-1 searchContainer">
            <input
              placeholder="Hãy tìm kiếm tất cả mọi thứ bạn thích..."
              className="py-2 px-3 w-full focus-visible:border-red-500 rounded-sm"
            />
            <div className="search_icon rounded-sm px-5">
              <FontAwesomeIcon
                icon={faSearch}
                className=" text-lg text-white "
              />
            </div>
          </div>
          <div
            className="wrapperCart"
            onMouseEnter={() => {
              isHovering = true;
              clearTimeout(hideTimeOut);
              popover.style.display = "inline-block";
            }}
            onMouseLeave={() => {
              isHovering = false;
              hideTimeOut = setTimeout(() => {
                if (!isHovering) popover.style.display = "none";
              }, 500);
            }}
          >
            <div className="CartShoppingContainer">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-white text-2xl icon_shoppingCart"
              />
              <span className="numberItemCart text-orange-500 text-center inline-block">
                {cart.length}
              </span>
            </div>

            {}
            <div
              className=" bg-white rounded-md popover_cart"
              onMouseEnter={() => {
                isHovering = true;
                clearTimeout(hideTimeOut);
                popover.style.display = "inline-block";
              }}
              onMouseLeave={() => {
                hideTimeOut = setTimeout(() => {
                  if (!isHovering) popover.style.display = "none";
                }, 500);
              }}
            >
              {content()}
              <div className="wrapper_triangle">
                <span className="triangle-up"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
