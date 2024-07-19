import { Router } from "express";
import {
  getAllProducts,
  getSpecificCategory,
} from "../controller/ProductsController.js";
import { isUserAuthenticated } from "../MiddleWares/auth.js";

const router = Router();
router.get("/get-products", isUserAuthenticated, getAllProducts);
router.get("/get-product", isUserAuthenticated, getSpecificCategory);
export default router;
