import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { productsModel } from "../models/productsSchema.js";

const getAllCategory = async () => {
  const AllProducts = await productsModel.find({});
  return AllProducts;
};
export const getAllProducts = CatchAsyncError(async (req, res, next) => {
  const productsFromData = await getAllCategory();
  //   console.log("productsFromData on server side: ", productsFromData);
  if (!productsFromData) {
    return next(new ErrorHandler("Error from getting all products!", 200));
  }
  res.json({
    success: true,
    message: "Get All products Successfully !",
    productsFromData,
  });
});

export const getSingleProduct = CatchAsyncError(async (req, res, next) => {
  const response = req.query.productname.replace("-", " ");
  console.log("get single product: ", response);

  const AllProducts = await getAllCategory();
  if (AllProducts.length == 0)
    next(new ErrorHandler("Not Found any product in get single product!", 400));
  console.log("all products in getsingle product: ", AllProducts);

  res.json({
    success: true,
    message: "get successfully!",
    AllProducts,
  });
});
export const getSpecificCategory = CatchAsyncError(async (req, res, next) => {
  console.log("req in getSpecificCategory: ", req.query);
  const category = await productsModel.find({ category: req.query.category });
  console.log("category on server side: ", category);
  if (category.length == 0) {
    console.log("bạn đang vào if không tìm thấy category!");
    return next(new ErrorHandler("Category is not exist!", 400));
  }
  res.json({
    success: true,
    category,
  });
});
