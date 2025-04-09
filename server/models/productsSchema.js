import mongoose from "mongoose";
const infomationSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  warranty: {
    type: String,
    required: true,
  },
  delivery: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
});
const variantsSchema = new mongoose.Schema({
  label: {
    type: String,
    requried: true,
  },
  variants: {
    type: [String],
    required: true,
  },
});
const productsSchem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // images: {
  //   type: [String],
  //   required: true,
  // },
  thumb: {
    type: String,
    required: true,
  },
  // descriptions: {
  //   type: [String],
  //   required: true,
  // },
  variants: {
    type: [variantsSchema],
    required: true,
  },
  informations: {
    type: infomationSchema,
    required: true,
  },
});

export const productsModel = mongoose.model("products", productsSchem);
