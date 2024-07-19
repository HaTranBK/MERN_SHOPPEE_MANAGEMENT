import React from "react";
import CategoryBasedCarousel from "../Carousel/CategoryBasedCarousel";
import CategoryBasedProducts from "../Products/CategoryBasedProducts";

const CategoryBasedBody = () => {
  return (
    <div>
      <CategoryBasedCarousel />
      <CategoryBasedProducts />
    </div>
  );
};

export default CategoryBasedBody;
