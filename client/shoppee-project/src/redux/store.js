import { configureStore } from "@reduxjs/toolkit";
import user_ from "./userReducer";
import products_ from "./productsReducer";
export const store = configureStore({
  reducer: {
    user_,
    products_,
  },
});
