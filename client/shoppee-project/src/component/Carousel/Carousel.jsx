import React from "react";
import Advertisements from "../Advertisements/Advertisements";

const Carousel = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 container_ mt-5">
      <div className="col-span-2 row-span-2 mt-1 pb-1">
        <Advertisements />
      </div>
      <div>
        <img
          src={
            "https://cf.shopee.vn/file/vn-11134258-7r98o-lxm9n0fcs8gr72_xhdpi"
          }
          alt=""
          className="p-1"
        />
      </div>
      <div>
        <img
          src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxmbpgk0qm6x20_xhdpi"
          alt=""
          className="px-1 pb-1"
        />
      </div>
    </div>
  );
};

export default Carousel;
