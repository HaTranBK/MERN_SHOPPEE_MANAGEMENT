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

export const Login = CatchAsyncError(async (req, res, next) => {
  const { email, confpassword, password, role } = req.body;
  if (!email || !confpassword || !role || !password) {
    return next(new ErrorHandler("Please Provide All Details !", 400));
  }
  if (password !== confpassword) {
    return next(
      new ErrorHandler("Password and confirm password dont match!", 400)
    );
  }
  const user = await UserModel.findOne({ email }).select("+password");
  //vì user được tạo ra từ UserModel cho nên là user là 1 instance => có thể gọi những hàm được định nghĩa thêm của UserModel.
  console.log("mật khẩu của user: ", user);
  if (!user) {
    return next(new ErrorHandler("Invalid Password Or Email !", 400));
  }

  const IsPasswordMatched = await user.comparePassword(password);
  console.log("ispassword matched: ", IsPasswordMatched);
  if (!IsPasswordMatched) {
    return next(new ErrorHandler("Your Password Is Not Correct !", 400));
  }

  if (role !== user.role) {
    return next(
      new ErrorHandler("You Dont Have a Permission To Access Admin Mode", 400)
    );
  }
  res.status(200).json({
    success: true,
    message: "You Logged In Successfully !",
  });
});

export const RemoveAccount = CatchAsyncError(async (req, res, next) => {});
