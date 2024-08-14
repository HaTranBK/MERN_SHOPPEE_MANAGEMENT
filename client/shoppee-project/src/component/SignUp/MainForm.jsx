import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import debounce from "lodash.debounce";
import {
  validateAccount,
  validateEmail,
  validateFirstName,
  validateGender,
  validateLastName,
  validatePassword,
  validatePhone,
  validateRole,
} from "../../validate/detailValidate";
import { Toaster, toast } from "sonner";
import { updateError, userState } from "../../redux/userReducer";
import { SignUp } from "../../service/userAPICallClient";
// import { init } from "create-react-app/createReactApp";

const MainForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialUser = () => {
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
  const [user, setUser] = useState(initialUser);
  const dispatch = useDispatch();
  const { error } = useSelector(userState);
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
      user.firstname &&
      user.lastname &&
      user.email &&
      user.phone &&
      user.account &&
      user.gender &&
      user.role
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

    password: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "password",
            value: validatePassword(value),
          })
        );
      }, 500),
      []
    ),
    role: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "role",
            value: validateRole(value),
          })
        );
      }, 500),
      []
    ),
    gender: useCallback(
      debounce((value) => {
        dispatch(
          updateError({
            name: "gender",
            value: validateGender(value),
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
    setUser((preUser) => {
      return { ...preUser, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await SignUp(user);
      notifySuccess(response.data.message);
      setUser(initialUser);
      setDisableButton(true);
      setTimeout(() => {
        navigate("/pre-process/sign/signin");
      }, 2500);
      // return () => clearTimeout(timer);
    } catch (error) {
      notifyError(error.response.data.message);
      console.log("lỗi ở submit: ", error.response.data.message);
    }
  };

  return (
    <div className="form-container rounded-md col-span-2 bg-white py-6">
      <Grid className="mb-4 form_title bg-white">
        <h1 className="text-green-500 text-center font-bold">SIGN UP FORM</h1>
      </Grid>
      <form
        action=""
        className="grid grid-cols-2 mx-auto gap-3 w-4/5 bg-white
      "
      >
        <div>
          <TextField
            id="filled-basic"
            label="First Name"
            variant="filled"
            name="firstname"
            onChange={handleChangeInput}
            value={user.firstname}
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
            value={user.lastname}
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
            value={user.email}
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
            value={user.phone}
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
            value={user.account}
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
              value={user.password}
              className="w-full"
            />

            <a onClick={handleShowPassword}>
              <FontAwesomeIcon
                icon={!showPassword ? faEyeSlash : faEye}
                className="exposed_password"
              />
            </a>
          </div>
          <p className="text-red-500">{error.password}</p>
        </div>
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
          className="m-0"
          style={{ margin: "0px" }}
        >
          <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="gender"
            onChange={handleChangeInput}
            value={user.gender}
          >
            {/* <MenuItem value="">None</MenuItem> */}
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
          <p className="text-red-500">{error.gender}</p>
        </FormControl>

        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 120 }}
          style={{ margin: "0px" }}
        >
          <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="role"
            onChange={handleChangeInput}
            value={user.role}
          >
            {/* <MenuItem value="">None</MenuItem> */}
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
          <p className="text-red-500">{error.role}</p>
        </FormControl>
      </form>
      <div className="text-center">
        <span>
          Bạn đã có tài khoản?
          <Link
            to={"/hihi"}
            className="text-red-600 underline underline-offset-2"
          >
            Đăng nhập
          </Link>
        </span>
      </div>
      <div className="flex justify-center">
        <Toaster richColors position="top-right" />
        <button
          className={`bg-green-500 rounded-md text-white px-4 py-2 my-3 ${
            disabledButton
              ? "bg-opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-80"
          }`}
          disabled={disabledButton}
          onClick={handleSubmit}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default MainForm;
