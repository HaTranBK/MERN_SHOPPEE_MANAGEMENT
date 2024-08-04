import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { AdminProductModel } from "../models/ProductAdminSchema.js";

export const getAllAdminProduct = CatchAsyncError(async (req, res, next) => {
  const AllAdminProducts = await AdminProductModel.find({});
  if (!AllAdminProducts)
    return next(new ErrorHandler("Cannot get all admin product!", 500));
  res.json({
    success: true,
    message: "Get All Admin Product successfully!",
    AllAdminProducts,
  });
});
export const addSingleAdProduct = CatchAsyncError(async (req, res, next) => {
  const { name, thumb, price, quantity, category } = req.body.newProduct;
  const insertedDocument = { name, thumb, price, quantity, category };
  const newAdProduct = await AdminProductModel.create(insertedDocument);
  if (!newAdProduct)
    return next(new ErrorHandler("Admin product created fail!", 400));
  res.json({
    success: true,
    message: "Create admin product successfully!",
  });
});

export const updateAdPorduct = CatchAsyncError(async (req, res, next) => {
  const { _id, name, thumb, price, quantity, category } = req.body.update;
  console.log("update admin product!");
  const updatedProduct = await AdminProductModel.findOneAndUpdate(
    { _id },
    {
      $set: {
        name: name,
        thumb: thumb,
        price: price,
        quantity: quantity,
      },
      $push: {
        category: category,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedProduct)
    return next(
      new ErrorHandler("Admin product is not updated successfully!", 401)
    );
  res.json({
    success: true,
    message: "Admin product updated successfully!",
    updatedProduct,
  });
});
export const deleteAdProduct = CatchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const deletedProduct = await AdminProductModel.findOneAndDelete({ _id });
  if (!deletedProduct)
    return next(new ErrorHandler("Admin product delete unsuccessfully!", 400));
  res.json({
    success: true,
    message: "Delete Admin Product successfully!",
    deletedProduct,
  });
});
