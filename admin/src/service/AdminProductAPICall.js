import axios from "axios";
import { DomainPath } from "../Path/path";

export const addnewAdminProduct = async (newProduct) => {
  const responseNewProduct = await axios.post(
    `${DomainPath.adminProduct}/add-adminproduct`,
    {
      newProduct,
    }
  );

  console.log("newProduct: ", responseNewProduct);
};

export const updateAdminProduct = async (update) => {
  const response = await axios.post(
    `${DomainPath.adminProduct}/update-adminproduct`,
    { update }
  );
  console.log("response in handle update product: ", response);
};

export const deleteAdminProduct = async (_id) => {
  const response = await axios.post(
    `${DomainPath.adminProduct}/delete-adminproduct`,
    { _id }
  );
  console.log("response in handle delete admin product: ", response);
};
