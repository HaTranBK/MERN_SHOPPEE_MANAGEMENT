import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import DetailItem from "../Item/DetailItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const CategoryBasedProducts = ({ pathname }) => {
  console.log("category name: ", pathname);
  const [order, setOrder] = useState("Giá");
  const [categoryProducts, setCategoryProducts] = useState({});
  const [searchParam, setSearchParam] = useSearchParams();
  const queryParamList = Object.fromEntries([...searchParam]);
  console.log("queryParamList: ", queryParamList);

  useEffect(() => {
    CategoriedData();
  }, []);

  const handleSortClick = (number) => {
    let ordertype = {};
    if (number == 0)
      ordertype = {
        one: "asc",
        two: "Giá tăng dần",
      };
    else
      ordertype = {
        one: "des",
        two: "Giá giảm dần",
      };
    setSearchParam({
      ...queryParamList,
      order: ordertype.one,
    });
    setOrder(ordertype.two);
  };

  const isValidKey = (key) => {
    return key[0] !== "category" && key[0] !== "_id" && key[0] !== "variants";
  };

  const parseNumber = (amount) => {
    let formattedAmount = amount.replace(/\./g, "");
    formattedAmount = formattedAmount.replace(/,/g, ".");

    // Chuyển đổi chuỗi thành số thực
    return parseFloat(formattedAmount);
  };

  const ProcessPriceString = (string) => {
    const original_string = string[1].price.replace(/VND/g, "").trim();
    const finalNumber = parseNumber(original_string);
    // console.log("replace: ", finalNumber);
    return finalNumber;
  };

  const CategoriedData = async () => {
    try {
      const Categoriedata = await axios.get(
        "http://localhost:8000/api/v1/products/get-category",
        {
          params: {
            category: pathname,
          },
          withCredentials: true,
        }
      );
      console.log("categoried data: ", Categoriedata);
      setCategoryProducts(Categoriedata.data.category[0]);
    } catch (error) {
      console.log("error from getting categoried data: ", error);
    }
  };

  const renderCategoriedProducts = () => {
    const OriginalProductsArr = [...Object.entries(categoryProducts)];
    if (Object.keys(queryParamList).length === 0) {
      return OriginalProductsArr.map(([key, value]) => {
        if (key !== "category" && key !== "variants" && key !== "_id") {
          return <DetailItem productInfo={value} />;
        }
      });
    }

    const sortedProducts = OriginalProductsArr.sort((a, b) => {
      if (isValidKey(a) && isValidKey(b)) {
        if (searchParam.get("order") === "asc") {
          return ProcessPriceString(a) - ProcessPriceString(b);
        } else return ProcessPriceString(b) - ProcessPriceString(a);
      }
    });
    return sortedProducts.map(([key, value]) => {
      if (key !== "category" && key !== "variants" && key !== "_id") {
        return <DetailItem productInfo={value} />;
      }
    });
  };

  return (
    <div>
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
      <h3 className="text-2xl text-red-500 text-center my-9">
        {categoryProducts.category}
      </h3>
      <div className="container_ filterBar flex justify-between bg-gray-300 px-2 py-4 mb-2">
        <span>Sắp xếp theo </span>
        <div className="w-40 flex justify-between bg-gray-100 items-center p-2 price_sort">
          <span className={order !== "Giá" ? "text-orange-500" : ""}>
            {order}
          </span>
          <FontAwesomeIcon icon={faAngleRight} className="arrow_icon" />
          <div className="sort_options">
            <ul className="bg-white w-40">
              <li
                className={`ascending_order px-2 pb-3 hover:cursor-pointer pt-2`}
                onClick={() => handleSortClick(0)}
              >
                Giá tăng dần
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`text-orange-500 ms-8 ${
                    order === "Giá tăng dần" ? "inline-block" : "hidden"
                  }`}
                />
              </li>
              <li
                className="descending_order px-2 pb-3 hover:cursor-pointer "
                onClick={() => handleSortClick(1)}
              >
                Giá giảm dần
                <FontAwesomeIcon
                  icon={faCheck}
                  className={`text-orange-500 ms-8 ${
                    order === "Giá giảm dần" ? "inline-block" : "hidden"
                  }`}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-red-500">
          <div className="container_ bg-white px-1">
            <div className="grid grid-cols-4 gap-2 products">
              {renderCategoriedProducts()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBasedProducts;

//  <Route
//    path={AdminPaths.OrderBOMSiteDetailRoute}
//    element={<OrderBOMDetail />}
//  />;

//  return `${AdminPaths.OrderBOMSiteDetailRoute}?partner_id=${partnerId}${
//    partnerName ? `&partner_name=${partnerName}` : ""
//  }&customer_id=${client_id}&site_id=${site_id}&order_id=${orderId}`;
