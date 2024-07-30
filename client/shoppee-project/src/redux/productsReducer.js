import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  Category_based_products: {},
  inforItem: {
    image: "",
    name: "",
    price: "",
    description: "",
    information: "",
    thumb: "",
  },
};

const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateAllproducts: function (state, actions) {
      state.products = actions.payload;
    },
    updateCategoryBasedProduct: function (state, actions) {
      state.Category_based_products = actions.payload;
    },
    updateInforItem: function (state, actions) {
      state.inforItem = actions.payload;
    },
  },
});

export const productsState = (state) => state.products_;
export const {
  updateAllproducts,
  updateCategoryBasedProduct,
  updateInforItem,
} = productsReducer.actions;

export default productsReducer.reducer;
