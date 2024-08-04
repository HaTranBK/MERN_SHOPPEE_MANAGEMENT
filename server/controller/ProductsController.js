import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { productsModel } from "../models/productsSchema.js";

const getAllCategory = async () => {
  const AllProducts = await productsModel.find({});
  return AllProducts;
};
export const getAllProducts = CatchAsyncError(async (req, res, next) => {
  const productsFromData = await getAllCategory();
  console.log("productsFromData on server side: ", productsFromData);
  if (!productsFromData) {
    return next(new ErrorHandler("Error from getting all products!", 404));
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
  console.log("AllProducts: ", AllProducts);
  if (AllProducts.length == 0)
    next(
      new ErrorHandler("Not Found any products in get single product!", 400)
    );
  // console.log("all products in getsingle product: ", AllProducts);

  res.json({
    success: true,
    message: "get successfully!",
    AllProducts,
  });
});
export const getSpecificCategory = CatchAsyncError(async (req, res, next) => {
  console.log("req in getSpecificCategory: ", req.query);
  const category = await productsModel.find({ category: req.query.category });
  // console.log("category on server side: ", category);
  if (category.length == 0) {
    console.log("bạn đang vào if không tìm thấy category!");
    return next(new ErrorHandler("Category is not exist!", 400));
  }
  res.json({
    success: true,
    category,
  });
});

export const updateProduct = CatchAsyncError(async (req, res, next) => {
  const { name, category, thumb, price, quantity } = req.body;
  const { initName } = req.query;
  const document = await productsModel.findOne({ category }).lean();
  if (!document) {
    // const
    return next(new ErrorHandler("Product Not Found!", 404));
  }
  console.log("document: ", document.category);
  console.log("document: ", document?.product_1?.name);
  let update = {};
  let nameKey = "";
  // for (const key in document) {
  //   if (key.startsWith("product_")) {
  //     if (document[key].name === initName) {
  //       const newProduct = { ...document[key], thumb, name, price, quantity };
  //       nameKey = key;
  //       // console.log("newProduct: ", newProduct);
  //       update = { ...newProduct };
  //       // console.log("update: ", update);
  //       console.log("namekey: ", [nameKey]);
  //     }
  //   }
  //   // update = { ...update, key: document[key] };
  // }
  const updatedField = { [nameKey]: update };
  console.log("updatedField: ", updatedField);
  console.log("category: ", category);
  console.log("name: ", name);
  const updatedProduct = await productsModel.findOneAndUpdate(
    { category },
    { category: "Smartphone2" },
    {
      new: true,
    }
    // { $set: updatedField },
    // { returnDocument: "after" }
  );
  // console.log("updatedProduct: ", updatedProduct.product_1);
  if (!updatedProduct) return next(new ErrorHandler("Updated failed!", 400));
  res.json({
    success: true,
    message: "Update Product successfully!",
    updatedProduct,
  });
});
