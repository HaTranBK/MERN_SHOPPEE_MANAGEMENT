import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
const HomeHeader = () => {
  return (
    <header>
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
      </div>
    </header>
  );
};

export default HomeHeader;
