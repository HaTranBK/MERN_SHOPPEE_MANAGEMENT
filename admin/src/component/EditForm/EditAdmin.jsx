import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import debounce from "lodash.debounce";

import { Toaster, toast } from "sonner";

const EditAdmin = ({ passedDataProduct, setPassedDataProduct = {} }) => {
  //   const initialNameProduct = passedDataProduct.name;
  const [showPassWord, setShowPassWrod] = useState(false);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPassedDataProduct((preadmin) => {
      return { ...preadmin, [name]: value };
    });
  };

  console.log("re render!", passedDataProduct);
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
            value={passedDataProduct.firstname || ""}
            className="w-full"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Last Name"
            variant="filled"
            name="lastname"
            onChange={handleChangeInput}
            value={passedDataProduct.lastname || ""}
            className="w-full"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            name="email"
            onChange={handleChangeInput}
            value={passedDataProduct.email || ""}
            className="w-full"
          />
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
            value={passedDataProduct?.gender || ""}
          >
            {/* <MenuItem value="">None</MenuItem> */}
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>

        <div>
          <TextField
            id="filled-basic"
            label="Account"
            variant="filled"
            name="account"
            onChange={handleChangeInput}
            value={passedDataProduct.account || ""}
            className="w-full"
          />
        </div>

        <div>
          <div className="password_form">
            <TextField
              id="filled-password-input"
              label="Password"
              type={showPassWord ? "text" : "password"}
              autoComplete="current-password"
              variant="filled"
              name="password"
              onChange={handleChangeInput}
              value={passedDataProduct.password || ""}
              className="w-full"
            />

            <a onClick={() => setShowPassWrod(true)}>
              <FontAwesomeIcon
                icon={!showPassWord ? faEyeSlash : faEye}
                className="exposed_password"
              />
            </a>
          </div>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Phone"
            variant="filled"
            name="phone"
            onChange={handleChangeInput}
            value={passedDataProduct.phone || ""}
            // className="w-full"
            style={{ width: "472px" }}
          />
        </div>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default EditAdmin;
