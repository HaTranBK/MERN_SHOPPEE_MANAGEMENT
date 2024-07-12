import { configureStore } from "@reduxjs/toolkit";
import user from "./userReducer";
export const store = configureStore({
  reducer: {
    user,
  },
});
