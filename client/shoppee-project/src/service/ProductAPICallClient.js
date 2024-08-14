import axios from "axios";
import { DomainPath } from "../../../../admin/src/Path/path";

export const getCategory = async () => {
  const response = await axios.get(`${DomainPath.products}/get-products`, {
    withCredentials: true,
  });
  console.log("getting all products on client side successfully: ", response);
  return response;
};

export const getCategoriedData = async (pathname) => {
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
  return Categoriedata;
};
export const getProduct = async (pathname) => {
  const Products = await axios.get(
    "http://localhost:8000/api/v1/products/get-product",
    {
      params: {
        productname: pathname,
      },
    }
  );
  console.log("data of get single product: ", Products);
  return Products;
};
