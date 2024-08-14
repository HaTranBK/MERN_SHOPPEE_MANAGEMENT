import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setLocalStorageItem } from "../utils/localStorage";

const initialState = {
  user: {},
  cart: [],
  error: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    account: "",
    password: "",
    role: "",
    gender: "",
  },
  islogin: false,
};

export const authenticateAccount = createAsyncThunk(
  "user/authenticateAccount",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/user/me",
        {
          withCredentials: true,
        }
      );
      updateIsLogIn();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteProduct: function (state, action) {
      console.log("state, action: ", state, action);
    },
    updateError: function (state, actions) {
      const { name, value } = actions.payload;
      state.error = {
        ...state.error,
        [name]: value,
      };
    },
    updateUserInformation: function (state, actions) {
      state.user = actions.payload;
      state.islogin = true;
      state.cart = state.user.cartItems;
      // setLocalStorageItem("user", actions.payload);
    },
    updateIsLogIn: function (state, actions) {
      state.islogin = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateAccount.fulfilled, (state, action) => {
        state.islogin = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(authenticateAccount.rejected, (state, action) => {
        state.islogin = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});
export const userState = (state) => state.user_;
export const {
  deleteProduct,
  updateError,
  updateUserInformation,
  updateIsLogIn,
} = userReducer.actions;
export default userReducer.reducer;
