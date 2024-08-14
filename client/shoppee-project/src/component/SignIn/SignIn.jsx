import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Radio } from "antd";
import { Toaster, toast } from "sonner";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserInformation } from "../../redux/userReducer";
import { LogIn } from "../../service/userAPICallClient";
import { setLocalStorageItem } from "../../utils/localStorage";
const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const Location = window.location.port;
  console.log("location: ", window.location.port);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const notifyError = (message) => toast.error(`🦄 ${message}`);
  const notifySuccess = (message) => toast.success(`🦄 ${message}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await LogIn(user);
      // console.log("response from signIn: ", response);
      notifySuccess(response.data.message);
      setUser({
        email: "",
        password: "",
        role: "",
      });
      const role = response.data.user.role;
      const localTokenName = role === "User" ? "userToken" : "adminToken";
      console.log("user information in signin: ", response.data.user);
      dispatch(updateUserInformation(response.data.user));
      setLocalStorageItem(`${role}`, response.data.user);
      localStorage.setItem(localTokenName, response.data.token);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(
        "error from post data from login: ",
        error.response.data.message
      );
      notifyError(error.response.data.message);
    }
  };
  return (
    <div className="signInContainer rounded-md bg-white py-6 w-96">
      <h3 className="signin_title px-3 text-2xl font-bold">Đăng Nhập</h3>
      <form
        action=""
        className="grid grid-cols-1 mx-auto gap-3 bg-white px-5 mt-8
      "
      >
        <div>
          <span className="font-semibold">Email:</span>
          <TextField
            id="filled-basic"
            label="Nhập email..."
            variant="filled"
            name="email"
            onChange={handleChange}
            value={user.email}
            fullWidth
          />
          <p className="text-red-500"></p>
        </div>
        <div>
          <span className="font-semibold">Mật khẩu:</span>
          <div className="password_container">
            <TextField
              id="filled-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="filled"
              name="password"
              onChange={handleChange}
              value={user.password}
              className="w-full"
            />

            <a onClick={handleShowPassword} className="show_password">
              <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} />
            </a>
          </div>
          <p className="text-red-500"></p>
        </div>
        <div>
          <span className="me-4 font-semibold">Role: </span>
          <Radio.Group onChange={handleChange} value={user.role} name="role">
            <Radio value="Admin">Admin</Radio>
            <Radio value="User">User</Radio>
          </Radio.Group>
        </div>
      </form>
      <div className="mt-9 text-right me-4">
        <Toaster richColors position="top-right" />
        <button
          className="py-3 px-4 bg-green-500 rounded-sm font-semibold hover:bg-green-300 transition duration-300 "
          onClick={handleSubmit}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default SignIn;
