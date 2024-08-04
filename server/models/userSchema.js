import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const stringType = {
  type: String,
  required: true,
};

const CartSchema = new mongoose.Schema({
  id: stringType,
  name: stringType,
  thumb: stringType,
  price: stringType,
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});
const OrderSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: "Được đặt",
  },
  name: stringType,
  thumb: stringType,
  price: stringType,
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: [3, "First name must contain at least 3 characters !"],
  },
  lastname: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain at least 3 characters !"],
  },
  email: {
    type: String,
    required: true,
    validator: [
      validator.isEmail,
      "Your email dont match Email standard format!",
    ],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exact 10 digits !"],
    maxLength: [10, "Phone number must contain exact 10 digits !"],
  },
  account: {
    type: String,
    required: true,
    minLength: [5, "Account name must contain at least 5 characters !"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    minLength: [8, "Password must contain at least 8 charaters !"],
    select: false,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "User"],
  },
  cartItems: {
    type: [CartSchema],
    required: false,
  },
  orders: {
    type: [OrderSchema],
    required: false,
  },
});

//userSchema.pre is a hook than run before the user document is save to database.
userSchema.pre("save", async function (next) {
  //this is a referrence to this user document.
  if (!this.isModified("password")) {
    // check if the password has been modified or not.
    next(); // navigate to the next middleware or save document to database.
  }
  //10 is saltrounds mean that the numebr of iterations of the hashing algorithm
  this.password = await bcrypt.hash(this.password, 10);
  console.log("hashed password: ", this.password);
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  console.log("update in pre middleware: ", update.$set.password);
  if (update.$set.password) {
    update.$set.password = await bcrypt.hash(update.$set.password, 10);
  }
  next();
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(
    "bạn đang vào compare password! @@@65 and hashed password: ",
    enteredPassword,
    this.password
  );
  //this.password refer to the hashed password.
  return await bcrypt.compare(enteredPassword, this.password);
  //return promise that resolve to true if the passwords match and false if they dont match.
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
  });
};
export const UserModel = mongoose.model("users", userSchema);
