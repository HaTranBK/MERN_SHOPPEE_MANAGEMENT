import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
  getSpecificCategory,
} from "../controller/ProductsController.js";
import { isUserAuthenticated } from "../MiddleWares/auth.js";

const router = Router();
router.get("/get-products", isUserAuthenticated, getAllProducts);
router.get("/get-category", isUserAuthenticated, getSpecificCategory);
router.get("/get-product", getSingleProduct);
export default router;
