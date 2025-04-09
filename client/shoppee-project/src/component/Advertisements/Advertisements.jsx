import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const Advertisements = () => {
  return (
    <Carousel
      arrows
      infinite={true}
      draggable={true}
      autoplay={true}
      autoplaySpeed={2000}
    >
      <div>
        <Link>
          <img
            src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxm8p6q6qml582_xxhdpi"
            alt="carousel"
          />
        </Link>
      </div>
      <div>
        <Link>
          <img
            src="https://cf.shopee.vn/file/vn-11134258-7r98o-lwvnhla0s5azc4_xxhdpi"
            alt="carousel"
          />
        </Link>
      </div>
      <div>
        <Link>
          <img
            src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxm822nodfbtf4_xxhdpi"
            alt="carousel"
          />
        </Link>
      </div>
      <div>
        <Link>
          <img
            src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxmb22u4hrkrb4_xxhdpi"
            alt="carousel"
          />
        </Link>
      </div>
    </Carousel>
  );
};

export default Advertisements;
