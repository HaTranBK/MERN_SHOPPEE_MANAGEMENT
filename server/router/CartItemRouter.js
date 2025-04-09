import { Router } from "express";
import { isUserAuthenticated } from "../MiddleWares/auth.js";
import {
  AddCartItem,
  BuyProducts,
  DeleteCartItem,
  DeleteCartItems,
  updateCartUser,
} from "../controller/UserController.js";

const router = Router();

router.post("/add-cart-item", isUserAuthenticated, AddCartItem);
router.post("/update-cart", isUserAuthenticated, updateCartUser);
router.post("/delete-item", isUserAuthenticated, DeleteCartItem);
router.post("/delete-items", isUserAuthenticated, DeleteCartItems);
router.post("/buy", isUserAuthenticated, BuyProducts);

export default router;
