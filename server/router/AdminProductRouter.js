import { Router } from "express";
import {
  addSingleAdProduct,
  deleteAdProduct,
  getAllAdminProduct,
  updateAdPorduct,
} from "../controller/AdminProductController.js";
const router = Router();

router.get("/get-adminproducts", getAllAdminProduct);
router.post("/add-adminproduct", addSingleAdProduct);
router.post("/update-adminproduct", updateAdPorduct);
router.post("/delete-adminproduct", deleteAdProduct);
export default router;
