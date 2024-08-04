import React from "react";
import { Link, NavLink } from "react-router-dom";

const navigations = [
  {
    to: "profile",
    name: "Profile",
  },
  {
    to: "user-list",
    name: "User List",
  },
  {
    to: "admin-list",
    name: "Admin List",
  },
  {
    to: "product-list",
    name: "Product List",
  },
];

const Navigation = () => {
  const renderNameNavigation = () => {
    return navigations.map(({ to, name }, index) => {
      return (
        <NavLink
          key={index}
          to={to}
          className={({ isActive, isPending }) => {
            // isActive là giá trị nhận được khi react router dom kiểm tra xem đường dẫn url có trùng với giá trị có trong thuộc tính to hay không
            return isActive
              ? "text-red-500 py-4 px-6 border border-b-gray-200 text-center"
              : "text-orange-500 py-4 px-6 border border-b-gray-200 text-center";
          }}
        >
          {name}
        </NavLink>
      );
    });
  };

  return <div className="flex flex-col w-1/5">{renderNameNavigation()};</div>;
};

export default Navigation;
