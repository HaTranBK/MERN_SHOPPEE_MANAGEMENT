import mongoose from "mongoose";
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
        message: error.message,
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
  const { email, password, role } = req.body;
  if (!email || !role || !password) {
    return next(new ErrorHandler("Please Provide All Details !", 400));
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
      new ErrorHandler(`You Dont Have a Permission To Access ${role} Mode`, 400)
    );
  }
  generateToke(user, "You Logged in Successfully !", 200, res);
  // res.json({
  //   success: true,
  //   message: "Log In Successfully!",
  // });
});

export const getAdmin = CatchAsyncError(async (req, res, next) => {
  const { _id } = req.body;
  const admin = await UserModel.findOne({ _id });
  console.log("admin on server side: ", admin);
  if (!admin) {
    return next(new ErrorHandler("Admin Not Found!", 404));
  }
  res.json({
    success: true,
    message: "Admin Got Successfully!",
    admin,
  });
});
export const RemoveAccount = CatchAsyncError(async (req, res, next) => {});

export const addNewAdmin = CatchAsyncError(async (req, res, next) => {
  console.log("rea.body on add new admin: ", req.body);
  const { firstname, lastname, email, phone, gender, password, account } =
    req.body;
  if (
    !firstname ||
    !lastname ||
    !email ||
    !phone ||
    !gender ||
    !password ||
    !account
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
    gender,
    account,
    password,
    role: "Admin",
  });
  generateToke(admin, "Admin Register Successfully", 200, res);
});

export const getAllAdmin = CatchAsyncError(async (req, res, next) => {
  const admins = await UserModel.find({ role: "Admin" }).select("+password");
  res.status(200).json({
    success: true,
    admins,
  });
});

export const getAllUser = CatchAsyncError(async (req, res, next) => {
  const users = await UserModel.find({ role: "User" }).select("+password");
  res.status(200).json({
    success: true,
    users,
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
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
    });
};
export const LogOutUser = async (req, res, next) => {
  console.log("ban vao logout tren server");
  res
    .status(200)
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
    });
};

export const AddCartItem = CatchAsyncError(async (req, res, next) => {
  console.log("param trong add cart item on server: ", req.query);
  const user = await UserModel.findOne({ _id: req.query._id });
  if (Object.keys(user).length == 0)
    return next(new ErrorHandler("User Not Found!", 404));
  let flag = false;
  user.cartItems.forEach((cartItem, index) => {
    if (cartItem.id === req.body.id && cartItem.name === req.body.name) {
      user.cartItems[index].quantity += 1;
      flag = true;
    }
  });
  let update = "";
  if (flag) update = { $set: { cartItems: user.cartItems } };
  else update = { $push: { cartItems: req.body } };
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: req.query._id },
    update,
    { returnDocument: "after" }
  );
  if (!updatedUser) {
    return next(new ErrorHandler("Updating user fail!", 200));
  }
  res.json({
    success: true,
    message: "Update successfully!",
    updatedUser,
  });
});
export const getSingleUser = CatchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.query._id });
  console.log("user in getsingleuser: ", user);
  if (!user)
    return next(new ErrorHandler("User not Found in getSingleUSer!", 404));
  res.json({
    success: true,
    message: "Get User successfully!",
    user,
  });
});
export const updateCartUser = CatchAsyncError(async (req, res, next) => {
  console.log("ban dang vao update cart user");
  const { id, type, index, itemId } = req.query;
  const user = await UserModel.findOne({ _id: id });
  console.log("present quantity: ", user.cartItems[index].quantity, type);

  let newQuantity =
    type === "true"
      ? user.cartItems[index].quantity + 1
      : user.cartItems[index].quantity - 1;
  console.log("new quantity: ", newQuantity);
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: id, "cartItems._id": itemId },
    {
      $set: {
        "cartItems.$.quantity": newQuantity,
        "cartItems.$.updatedAt": new Date(),
      },
    },
    { new: true }
  );
  console.log("updated cart user: ", updatedUser);
  if (updatedUser) {
    res.json({
      success: true,
      message: "Update successfully!",
      updatedUser,
    });
  } else next(new ErrorHandler("Update cart item fail!", 400));
});

export const DeleteCartItem = CatchAsyncError(async (req, res, next) => {
  const { userId, itemId } = req.query;
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        cartItems: { _id: itemId },
      },
    },
    { new: true } // Trả về tài liệu đã được cập nhật
  );

  console.log("updatedUser in delete item: ", updatedUser);
  if (updatedUser) {
    res.json({
      success: true,
      message: "Item removed successfully!",
      updatedUser,
    });
  } else {
    return next(new ErrorHandler("Delete item fail!", 400));
  }
});

export const DeleteCartItems = CatchAsyncError(async (req, res, next) => {
  const { userId, itemIds } = req.body;
  // console.log("req.body: ", req.body);
  // console.log("itemids: ", itemIds, userId);
  // Chuyển đổi itemIds từ chuỗi thành mảng ObjectId
  // console.log("itemIdsArray: ", itemIdsArray);
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        cartItems: { _id: { $in: itemIds } },
      },
    },
    { new: true } // Trả về tài liệu đã được cập nhật
  );
  if (updatedUser) {
    res.json({
      success: true,
      message: "Delete cart items successfully!",
      updatedUser,
    });
  } else {
    return next(new ErrorHandler("USer not Found!", 404)); // Trả về 404 nếu không tìm thấy người dùng
  }
});

export const BuyProducts = CatchAsyncError(async (req, res, next) => {
  const { userId, itemIds } = req.body;
  const user = await UserModel.findOne({ _id: userId });
  if (!user)
    return next(new ErrorHandler("User not Found in Buy Product: ", 404));
  console.log("user in buy product on server: ", user);
  const BoughtItems = user.cartItems.filter((item) => {
    console.log("items: ", item._id.toString());
    return itemIds.includes(item._id.toString());
  });
  console.log("bought items: ", BoughtItems);

  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        cartItems: { _id: { $in: itemIds } },
      },
      $push: {
        orders: { $each: BoughtItems },
      },
    },
    { new: true } // Trả về tài liệu đã được cập nhật
  );
  if (updatedUser) {
    res.json({
      success: true,
      message: " items successfully!",
      updatedUser,
    });
  } else {
    return next(new ErrorHandler("USer not Found!", 404)); // Trả về 404 nếu không tìm thấy người dùng
  }
});

export const EditAdmin = CatchAsyncError(async (req, res, next) => {
  const { _id, firstname, lastname, email, phone, account, password } =
    req.body;
  const updatedField = {
    $set: {
      firstname,
      lastname,
      email,
      phone,
      account,
      password,
    },
  };
  const updatedAdmin = await UserModel.findOneAndUpdate({ _id }, updatedField, {
    returnDocument: "after",
  });
  if (!updatedAdmin) {
    return next(new ErrorHandler("Admin Not Found!", 404));
  }
  res.json({
    success: true,
    message: "Admin Updated Successfully!",
    updatedAdmin,
  });
});
