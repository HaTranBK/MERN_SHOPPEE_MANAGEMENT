import mongoose from "mongoose";
const stringType = {
  type: String,
  required: true,
};
const CategorySChema = new mongoose.Schema({
  name: stringType,
});

export const CategoryModel = mongoose.model("category", CategorySChema);
