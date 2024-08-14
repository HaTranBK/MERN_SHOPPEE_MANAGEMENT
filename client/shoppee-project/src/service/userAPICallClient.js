import axios from "axios";
import { DomainPath } from "../../../../admin/src/Path/path";

export const getUser = async (_id, type = "user") => {
  const response = await axios.get(`${DomainPath.user}/get-user`, {
    params: { _id },
  });
  console.log("response in getUser in userAPICallClient: ", response);
  return response;
};

export const getUserAuthenticated = async () => {
  const response = await axios.get(`${DomainPath.user}/me`, {
    withCredentials: true,
  });
  console.log(
    "response in APICall in getUserAuthenticated of HomeHeader: ",
    response
  );
  return response;
};

export const LogOut = async () => {
  const response = await axios.post(
    `${DomainPath.user}/logout-user`,
    {},
    { withCredentials: true }
  );
  console.log("Log out successfully: ", response);
};

export const LogIn = async (user) => {
  const response = await axios.post(
    `${DomainPath.user}/login`,
    user,
    { withCredentials: true } //dùng để gửi kèm theo cookie hoặc nhận cookie trả về từ server
  );
  // console.log("response from signIn: ", response);
  return response;
};

export const SignUp = async (user) => {
  const response = await axios.post(`${DomainPath.user}/signup`, user);
  console.log("respone: ", response);
  if (response.status !== 200) {
    console.log("lỗi khác 200");
  }
  return response;
};
