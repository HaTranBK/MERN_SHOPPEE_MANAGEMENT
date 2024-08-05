import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./dataBase/dataBaseConnection.js";
import cloudinary from "cloudinary";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productsRouter.js";
import { errorMiddleWare } from "./MiddleWares/ErrorMiddleWare.js";
import AdRouter from "./router/AdminProductRouter.js";
import CategoryRouter from "./router/CategoryRouter.js";
dotenv.config({ path: "./config/cfg.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//connecting to database MongooDB
dbConnection();

const app = express();
const PORT = process.env.PORT || 8000;
console.log("port trong env: ", process.env.PORT);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    method: ["POST", "PUT", "DELETE", "GET"],
    credentials: true, //allow cookie be sent with request.
  })
);

app.use(express.json());

//cookieParrser dùng để phân tích cookie
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// thiết lập middleware để xử lý file được gửi lên
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//NẾU CÓ LỖI THÌ SẼ ĐẾN ERRORMIDDLEWARE PHÍA DƯỚI ĐỂ XỬ LÝ
// FIX: Review RestAPI Standard for GET, POST, PUT, DELETE
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/adproduct", AdRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/cart", CategoryRouter);

app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT: ", PORT);
});
