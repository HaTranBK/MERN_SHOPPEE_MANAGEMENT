import axios from "axios";
import { DomainPath } from "../Path/path";

export const getUser = async (_id, type = "admin") => {
  const response = await axios.get(`${DomainPath.user}/${type}/me`, {
    params: { _id },
  });
  console.log("response: ", response);
  return response;
};

export const getUsers = async () => {
  const response = await axios.get(`${DomainPath.user}/users`);
  console.log("response in userList: ", response);
  return response;
};

export const getAdmins = async () => {
  const response = await axios.get(`${DomainPath.user}/admins`);
  console.log("response in adminList: ", response);
  return response;
};

export const getAdminProducts = async () => {
  const response = await axios.get(
    `${DomainPath.adminProduct}/get-adminproducts`
  );
  console.log("response in product list: ", response);
  return response;
};

export const update_ = async (update, type) => {
  const response = await axios.post(`${DomainPath.user}/update-${type}`, {
    update,
  });
  console.log("response in handle update admin: ", response);
};

export const addNew = async (
  { firstname, lastname, email, phone, gender, password, account },
  type
) => {
  const response = await axios.post(`${DomainPath.user}/${type}/addnew`, {
    firstname,
    lastname,
    email,
    phone,
    gender,
    password,
    account,
  });
  console.log("response in handle add new admin: ", response);
};

export const delete_ = async (_id, type) => {
  const response = await axios.delete(`${DomainPath.user}/delete-${type}`, {
    data: { _id },
  });
  console.log("response in handleDelete admin account: ", response);
};
