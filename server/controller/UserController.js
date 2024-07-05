import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { UserModel } from "../models/userSchema.js";
export const UserRegister = CatchAsyncError(async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    birthday,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !birthday ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form !", 400));
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return next(new ErrorHandler("Email Already Registered !", 400));
  }
  user = await UserModel.create({
    firstname,
    lastname,
    email,
    phone,
    birthday,
    gender,
    password,
    role,
  });
  res.status(200).json({
    success: true,
    message: "Account Registered Successfully !",
  });
});
