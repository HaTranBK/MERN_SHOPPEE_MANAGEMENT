import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-96">
      <div>
        <img
          src="	https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shopmicrofe/6202cbd8f3f78638666d.png"
          alt=""
        />
      </div>
      <div>
        <span>
          Không thể tải Shop này. Quay lại <Link to={"/"}>trang chủ</Link>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
