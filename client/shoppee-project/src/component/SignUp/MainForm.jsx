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
import { updateError, userState } from "../../redux/userReducer";
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
  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

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
      const respone = await axios.post(
        "http://localhost:8000/api/v1/user/signup",
        user
      );
      console.log("respone: ", respone);
      if (respone.status !== 200) {
        console.log("lỗi khác 200");
      }
      console.log("Đăng kí thành công !", respone);
      setUser(initialUser);
    } catch (error) {
      console.log("lỗi ở submit: ", error);
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
            />

            <a onClick={handleShowPassword}>
              <FontAwesomeIcon icon={faEye} className="exposed_password" />
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
      <div className="flex justify-center">
        <button
          className="bg-green-500 rounded-md text-white px-4 py-2 my-3 hover:bg-opacity-80"
          onClick={handleSubmit}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default MainForm;
