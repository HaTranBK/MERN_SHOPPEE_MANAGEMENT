import mongoose from "mongoose";
const stringType = {
  type: String,
  required: true,
};
const ProductsAdminSchema = new mongoose.Schema({
  name: stringType,
  thumb: stringType,
  price: stringType,
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});

export const AdminProductModel = mongoose.model(
  "adminProduct",
  ProductsAdminSchema
);
