import { CatchAsyncError } from "../MiddleWares/CatchAsyncError.js";
import ErrorHandler from "../MiddleWares/ErrorMiddleWare.js";
import { UserModel } from "../models/userSchema.js";
import { generateToke } from "../utils/jwtToken.js";
export const UserRegister = CatchAsyncError(async (req, res, next) => {
  console.log("bạn vào register!");
  const { firstname, lastname, email, phone, account, gender, password, role } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !account ||
    !gender ||
    !password ||
    !role
  ) {
    console.log("bạn đang vào lỗi điền thiếu field!");
    return next(new ErrorHandler("Please Fill Full Form !", 400));
  }
  let user = await UserModel.findOne({ email });
  console.log("user: ", user);
  if (user) {
    return next(new ErrorHandler("Email Already Registered !", 400));
  }
  try {
    user = await UserModel.create({
      firstname,
      lastname,
      email,
      phone,
      account,
      gender,
      password,
      role,
    });
  } catch (error) {
    return new Promise((res, rej) => {
      rej({
        success: false,
        message: "Lỗi tạo user!",
      });
    });
  }
  console.log("completed User: ", user);
  // generateToke(user, "Registered Successfully !", 200, res);
  res.json({
    success: true,
    message: "Sign Up Successfully!",
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
  //select("+password") dùng để lấy luôn cả field password mà được setup là select:false
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
      new ErrorHandler("You Dont Have a Permission To Access User Mode", 400)
    );
  }
  generateToke(user, "You Logged in Successfully !", 200, res);
  // res.json({
  //   success: true,
  //   message: "Log In Successfully!",
  // });
});

export const RemoveAccount = CatchAsyncError(async (req, res, next) => {});

export const addNewAdmin = CatchAsyncError(async (req, res, next) => {
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
  const emailRegistered = await UserModel.findOne({ email });
  console.log("existed email: ", emailRegistered);
  if (emailRegistered) {
    return next(
      new ErrorHandler(
        `${emailRegistered.role} With This Email ALready Exists !`,
        200
      )
    );
  }
  const admin = await UserModel.create({
    firstname,
    lastname,
    email,
    phone,
    birthday,
    gender,
    password,
    role: "Admin",
  });
  generateToke(admin, "Admin Register Successfully", 200, res);
});

export const getAllAdmin = CatchAsyncError(async (req, res, next) => {
  const admins = await UserModel.find({ role: "Admin" });
  res.status(200).json({
    success: true,
    admins,
  });
});

export const getUserDetails = CatchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const LogOutAdmin = async (req, res, next) => {
  res.status(200).cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
};
