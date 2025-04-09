import { Router } from "express";
import { addCategory } from "../controller/CategoryController.js";
const router = Router();

router.post("/add-category", addCategory);

export default router;
