import { TextField } from "@mui/material";
// import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import debounce from "lodash.debounce";

import { Toaster, toast } from "sonner";

import {
  validateAccount,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
} from "../../../../client/shoppee-project/src/validate/detailValidate";
import { ModalState, updateError } from "../../redux/ModalReducer";
// import { init } from "create-react-app/createReactApp";

const EditForm = ({ admin, setAdmin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const initialadmin = () => {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      account: "",
      gender: "",
      role: "",
      password: "",
    };
  };
  const dispatch = useDispatch();
  const { error } = useSelector(ModalState);
  const [disabledButton, setDisableButton] = useState(true);
  const navigate = useNavigate();
  const notifyError = (message) => toast.error(`🦄 ${message}`);
  const notifySuccess = (message) => toast.success(`🦄 ${message}`);
  console.log("re render!");
  useEffect(() => {
    const {
      firstname,
      lastname,
      email,
      phone,
      account,
      gender,
      role,
      password,
    } = error;
    if (
      !firstname &&
      !lastname &&
      !email &&
      !phone &&
      !account &&
      !gender &&
      !role &&
      !password &&
      admin.firstname &&
      admin.lastname &&
      admin.email &&
      admin.phone &&
      admin.account &&
      admin.gender &&
      admin.role
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [error]);

  function debounce(func, delay) {
    let debounceTimer;
    return function (arg) {
      // Chỉ nhận một đối số
      clearTimeout(debounceTimer); // Xóa bộ đếm thời gian trước đó nếu có
      debounceTimer = setTimeout(() => func(arg), delay); // Đặt lại bộ đếm thời gian mới
    };
  }

  let ErrorGroup = {
    firstname: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "firstname",
            value: validateFirstName(value),
          })
        );
      }, 500),
      []
    ),

    lastname: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "lastname",
            value: validateLastName(value),
          })
        );
      }, 500),
      []
    ),

    email: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "email",
            value: validateEmail(value),
          })
        );
      }, 500),
      []
    ),

    phone: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "phone",
            value: validatePhone(value),
          })
        );
      }, 500),
      []
    ),

    account: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "account",
            value: validateAccount(value),
          })
        );
      }, 500),
      []
    ),
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    ErrorGroup[name](value);
    setAdmin((preadmin) => {
      return { ...preadmin, [name]: value };
    });
  };

  return (
    <div className="form-container rounded-md col-span-2 bg-white py-6">
      <form
        action=""
        className="grid grid-cols-2 mx-auto gap-3 bg-white
      "
      >
        <div>
          <TextField
            id="filled-basic"
            label="First Name"
            variant="filled"
            name="firstname"
            onChange={handleChangeInput}
            value={admin.firstname}
            className="w-full"
          />
          <p className="text-red-500">{error.firstname}</p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            name="lastname"
            onChange={handleChangeInput}
            value={admin.lastname}
            className="w-full"
          />
          <p className="text-red-500">{error.lastname}</p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            name="email"
            onChange={handleChangeInput}
            value={admin.email}
            className="w-full"
          />
          <p className="text-red-500">{error.email}</p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Phone"
            variant="filled"
            name="phone"
            onChange={handleChangeInput}
            value={admin.phone}
            className="w-full"
          />
          <p className="text-red-500">{error.phone}</p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Account Name"
            variant="filled"
            name="account"
            onChange={handleChangeInput}
            value={admin.account}
            className="w-full"
          />
          <p className="text-red-500">{error.account}</p>
        </div>
        <div>
          <div className="password_form">
            <TextField
              id="filled-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="filled"
              name="password"
              onChange={handleChangeInput}
              value={admin.password}
              className="w-full"
            />

            <a onClick={handleShowPassword}>
              <FontAwesomeIcon
                icon={!showPassword ? faEye : faEyeSlash}
                className="exposed_password"
              />
            </a>
          </div>
          <p className="text-red-500">{error.password}</p>
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default EditForm;
