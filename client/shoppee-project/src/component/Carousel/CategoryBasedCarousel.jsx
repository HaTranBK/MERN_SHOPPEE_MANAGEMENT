import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";

const CategoryBasedCarousel = () => {
  return (
    <div className="container_ mt-5">
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
              src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxc9ugpq8mop90"
              alt="carousel"
            />
          </Link>
        </div>
        <div>
          <Link>
            <img
              src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxjcs91nd49n13"
              alt="carousel"
            />
          </Link>
        </div>
        <div>
          <Link>
            <img
              src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxc9ugpq8mop90"
              alt="carousel"
            />
          </Link>
        </div>
        <div>
          <Link>
            <img
              src="https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681"
              alt="carousel"
            />
          </Link>
        </div>
      </Carousel>
    </div>
  );
};

export default CategoryBasedCarousel;
