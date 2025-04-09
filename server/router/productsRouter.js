import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  getSpecificCategory,
  updateProduct,
} from "../controller/ProductsController.js";
import { isUserAuthenticated } from "../MiddleWares/auth.js";

const router = Router();
router.get("/get-products", getAllProducts);
router.get("/get-category", getSpecificCategory);
router.get("/get-product", getSingleProduct);
router.post("/update-product", updateProduct);

export default router;
