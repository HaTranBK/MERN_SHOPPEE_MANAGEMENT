import { configureStore } from "@reduxjs/toolkit";
import modal from "./ModalReducer";

export const store = configureStore({
  reducer: {
    modal,
  },
});
