// import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  const url = window.location.href; // Get the full URL
  const pathname = window.location.pathname; // Get the pathname
  const last_path = pathname.split("/").filter(Boolean);
  console.log("last_path: ", last_path);
  return (
    <header className="py-5">
      <div className="container_ flex justify-between items-center w-3/4 mx-auto">
        <div className="flex items-center justify-center">
          <Link to="/">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="text-5xl text-red-500 me-3"
            />
            <span className="text-4xl text-red-500 text-semibold me-3 ">
              Shoppe
            </span>
          </Link>
          <span className="text-2xl text-black-400 text-semibold pt-3">
            {last_path[2] === "signin" ? "Đăng Nhập" : "Đăng Ký"}
          </span>
        </div>
        <div>
          <a href="#" className="text-red-400 underline hover:decoration-solid">
            Bạn cần trợ giúp ?
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
