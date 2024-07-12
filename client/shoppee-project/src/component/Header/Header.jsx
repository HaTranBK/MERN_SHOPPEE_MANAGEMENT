// import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="py-5">
      <div className="container flex justify-between items-center w-3/4 mx-auto">
        <div className="flex items-center justify-center">
          <a href="" className="">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="text-5xl text-red-500 me-3"
            />
          </a>
          <a href="">
            <span className="text-4xl text-red-500 text-semibold me-3 ">
              Shoppe
            </span>
          </a>
          <span className="text-2xl text-black-400 text-semibold pt-2">
            Đăng kí
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
