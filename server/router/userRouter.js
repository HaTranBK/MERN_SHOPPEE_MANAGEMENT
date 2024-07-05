import { Router } from "express";
import { UserRegister } from "../controller/UserController.js";

const router = Router();

router.post("/signup", UserRegister);

export default router;
