import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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

const HomeHeader = () => {
  const { islogin } = useSelector(userState);
  const dispatch = useDispatch();
  console.log("islogin: ", islogin);
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
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/user/me",
          {
            withCredentials: true,
          }
        );
        dispatch(updateIsLogIn());
        dispatch(updateUserInformation(response.data.user));
        return response.data;
      } catch (error) {
        console.log("loi: ", error);
      }
    };
    authenticate();
  }, []);
  const authenticate = () => {
    dispatch(authenticateAccount());
    // renderSignInSignUp();
  };
  return (
    <header className=" py-6" style={{ backgroundColor: "#FB5730" }}>
      <div className="header_home container_">
        <div className="flex justify-end gap-2 mb-5 text-white ">
          {renderSignInSignUp()}
        </div>
        <div className="flex items-center justify-around  gap-10">
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
              className="py-3 px-3 w-full focus-visible:border-red-500 rounded-sm"
            />
            <div className="search_icon rounded-sm px-5">
              <FontAwesomeIcon
                icon={faSearch}
                className=" text-lg text-white "
              />
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-white text-2xl"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
