import express from "express";
import dotenv from "dotenv";
import cors from "cors";
<<<<<<< HEAD
// import cookieParser from "cookie-parser";
=======
import cookieParser from "cookie-parser";
>>>>>>> 2a27bdd5a308916ff392986025f26c6421680e1f
import fileUpload from "express-fileupload";
import { dbConnection } from "./dataBase/dataBaseConnection.js";
import cloudinary from "cloudinary";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productsRouter.js";
import { errorMiddleWare } from "./MiddleWares/ErrorMiddleWare.js";
import AdRouter from "./router/AdminProductRouter.js";
import CategoryRouter from "./router/CategoryRouter.js";
import CartItemRouter from "./router/CartItemRouter.js";
import { typeDefs } from "./schema/shcema.js";
import { resolvers } from "./resolver/resolvers.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
<<<<<<< HEAD
import cookieParser from "cookie-parser";
dotenv.config({ path: "./config/config.env" });
=======
dotenv.config({ path: "./config/cfg.env" });
>>>>>>> 2a27bdd5a308916ff392986025f26c6421680e1f

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//connecting to database MongooDB
dbConnection();

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
const app = express();

const PORT = process.env.PORT || 8000;
<<<<<<< HEAD
console.log("port trong env: ", process.env.PORT, process.env.FRONTEND_URL);

app.use(
  cors({
    origin: "http://localhost:5173",
=======
// console.log("port trong env: ", process.env.PORT);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
>>>>>>> 2a27bdd5a308916ff392986025f26c6421680e1f
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
app.use("/api/v1", userRouter);

app.use("/api/v1/products", productRouter);

app.use("/api/v1/adproduct", AdRouter);

app.use("/api/v1/category", CategoryRouter);

app.use("/api/v1/cart", CartItemRouter);

app.use(errorMiddleWare);

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log("SERVER IS RUNNING ON PORT: ", PORT);
});
=======
// app.listen(PORT, () => {
//   console.log("SERVER IS RUNNING ON PORT: ", PORT);
// });
>>>>>>> 2a27bdd5a308916ff392986025f26c6421680e1f
