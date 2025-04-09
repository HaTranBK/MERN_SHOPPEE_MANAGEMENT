import { Router } from "express";
import {
  EditAdmin,
  EditUser,
  LogOutAdmin,
  LogOutUser,
  Login,
  RemoveAdminAccount,
  RemoveUserAccount,
  UserRegister,
  addNewAdmin,
  addNewUser,
  getAdmin,
  getAllAdmin,
  getAllUser,
  getSingleUser,
  getUserDetails,
} from "../controller/UserController.js";

import {
  isAdminAuthenticated,
  isUserAuthenticated,
} from "../MiddleWares/auth.js";
const router = Router();
//======================USER===============================//

//----------------POST METHOD----------------
router.post("/signup", UserRegister);
router.post("/login", Login);
router.post("/user/addnew", addNewUser);
router.post("/logout-user", LogOutUser);
router.post("/update-user", EditUser);

//--------------GET METHOD----------------
router.get("/users", getAllUser);
router.get("/me", isUserAuthenticated, getUserDetails);
router.get("/get-user", isUserAuthenticated, getSingleUser);
//----------------DELETE METHOD-----------
router.delete("/delete-user", RemoveUserAccount);

//=======================ADMIN=======================//

//--------------POST----------------
router.post("/admin/addnew", addNewAdmin);
router.post("/logout-admin", LogOutAdmin);
router.post("/update-admin", EditAdmin);

//----------------GET----------------
router.get("/admins", getAllAdmin);
router.get("/admin/me", getAdmin);
//----------------DELETE-------------
router.delete("/delete-admin", RemoveAdminAccount);
export default router;
