import { Router } from "express";
import {
  AddCartItem,
  BuyProducts,
  DeleteCartItem,
  DeleteCartItems,
  EditAdmin,
  LogOutAdmin,
  LogOutUser,
  Login,
  UserRegister,
  addNewAdmin,
  getAdmin,
  getAllAdmin,
  getAllUser,
  getSingleUser,
  getUserDetails,
  updateCartUser,
} from "../controller/UserController.js";

import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../MiddleWares/auth.js";
const router = Router();
//----------------POST METHOD----------------
router.post("/signup", UserRegister);
router.post("/login", Login);
router.post("/admin/addnew", addNewAdmin);
router.post("/logout-admin", LogOutAdmin);
router.post("/logout-user", LogOutUser);
router.post("/add-cart-item", isUserAuthenticated, AddCartItem);
router.post("/update-cart", isUserAuthenticated, updateCartUser);
router.post("/delete-item", isUserAuthenticated, DeleteCartItem);
router.post("/delete-items", isUserAuthenticated, DeleteCartItems);
router.post("/buy", isUserAuthenticated, BuyProducts);
router.post("/update-admin", EditAdmin);

//--------------GET METHOD----------------
router.get("/admins", getAllAdmin);
router.get("/users", getAllUser);
router.get("/admin/me", getAdmin);
router.get("/user/me", isUserAuthenticated, getUserDetails);
router.get("/get-user", isUserAuthenticated, getSingleUser);
export default router;
