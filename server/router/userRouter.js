import { Router } from "express";
import {
  Login,
  UserRegister,
  addNewAdmin,
  getAllAdmin,
  getUserDetails,
} from "../controller/UserController.js";

import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../MiddleWares/auth.js";
const router = Router();

router.post("/signup", UserRegister);
router.post("/login", Login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/admins", getAllAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/user/me", isUserAuthenticated, getUserDetails);
export default router;
