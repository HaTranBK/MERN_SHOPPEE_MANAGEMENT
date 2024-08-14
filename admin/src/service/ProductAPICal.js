import axios from "axios";

export const getCategory = async () => {
  const response = await axios.get(
    "http://localhost:8000/api/v1/products/get-products",
    { withCredentials: true }
  );
  console.log("getting all products on client side successfully: ", response);
  return response;
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
};
