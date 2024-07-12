import { UserModel } from "../models/userSchema.js";
import { CatchAsyncError } from "./CatchAsyncError.js";
import ErrorHandler from "./ErrorMiddleWare.js";
import jwt from "jsonwebtoken";
export const isAdminAuthenticated = CatchAsyncError(async (req, res, next) => {
  console.log("cookie of admin: ", req.cookies);
  const token = req.cookies.adminToken;
  if (!token) {
    return next(new ErrorHandler("Admin Is Not Authenticated !", 400));
  }

  //Nếu như token hợp lệ thì nó sẽ trả về payload tức data được mã hóa trong token đó.
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log("decoded data: ", decoded);
  req.user = await UserModel.findById(decoded.id);

  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} Not Authorized For This Resource!`,
        403
      )
    );
  }
  next();
});

export const isUserAuthenticated = CatchAsyncError(async (req, res, next) => {
  console.log("cookie of user: ", req.cookies);
  const token = req.cookies.userToken;
  console.log("token user: ", token);
  if (!token) {
    return next(new ErrorHandler("User Is Not Authenticated !", 400));
  }

  //Nếu như token hợp lệ thì nó sẽ trả về payload tức data được mã hóa trong token đó.
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is not valid!" });
    console.log("decoded data: ", decoded);
    req.user = await UserModel.findById(decoded.id);

    if (req.user.role !== "User") {
      return next(
        new ErrorHandler(
          `${req.user.role} Not Authorized For This Resource!`,
          403
        )
      );
    }
    next();
  });
});
