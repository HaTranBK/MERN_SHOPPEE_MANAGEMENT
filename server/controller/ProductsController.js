import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { productsModel } from "../models/productsSchema.js";

export const getAllProducts = CatchAsyncError(async (req, res, next) => {
  const productsFromData = await productsModel.find({});
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

export const getSpecificCategory = CatchAsyncError(async (req, res, next) => {
  console.log("req in getSpecificCategory: ", req.query);
  const category = await productsModel.find({ category: req.query.category });
  console.log("category on server side: ", category);
  if (!category) {
    return next(new ErrorHandler("Category is not exist!", 400));
  }
  res.json({
    success: true,
    category,
  });
});
