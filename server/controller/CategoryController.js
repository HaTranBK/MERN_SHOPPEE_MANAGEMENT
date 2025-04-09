import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { CategoryModel } from "../models/CategorySchema.js";

export const addCategory = CatchAsyncError(async (req, res, next) => {
  const newCategory = await CategoryModel.create(req.body);
  if (!newCategory)
    return next(new ErrorHandler("Category created fail!", 401));
  res.json({
    success: true,
    message: "Category created successfully!",
  });
});
