import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
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
};

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
  },
});
export const userState = (state) => state.user;
export const { deleteProduct, updateError } = userReducer.actions;
export default userReducer.reducer;
