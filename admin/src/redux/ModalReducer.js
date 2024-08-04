import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowInforModal: false,
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

const ModalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showInforModal: function (state) {
      state.isShowInforModal = !state.isShowInforModal;
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
export const ModalState = (state) => state.modal;
export const { showInforModal, updateError } = ModalReducer.actions;

export default ModalReducer.reducer;
