import { Router } from "express";
import {
  AddCartItem,
  DeleteCartItem,
  DeleteCartItems,
  LogOutAdmin,
  LogOutUser,
  Login,
  UserRegister,
  addNewAdmin,
  getAllAdmin,
  getSingleUser,
  getUserDetails,
  updateCartUser,
} from "../controller/UserController.js";

import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../MiddleWares/auth.js";
const router = Router();

router.post("/signup", UserRegister);
router.post("/login", Login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/logout-admin", LogOutAdmin);
router.post("/logout-user", LogOutUser);
router.post("/add-cart-item", isUserAuthenticated, AddCartItem);
router.post("/update-cart", isUserAuthenticated, updateCartUser);
router.post("/delete-item", isUserAuthenticated, DeleteCartItem);
router.post("/delete-items", isUserAuthenticated, DeleteCartItems);

router.get("/admins", getAllAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/user/me", isUserAuthenticated, getUserDetails);
router.get("/get-user", isUserAuthenticated, getSingleUser);
export default router;
