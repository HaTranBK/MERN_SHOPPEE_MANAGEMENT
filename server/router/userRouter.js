import { Router } from "express";
import { Login, UserRegister } from "../controller/UserController.js";

const router = Router();

router.post("/signup", UserRegister);
router.post("/login", Login);
export default router;
