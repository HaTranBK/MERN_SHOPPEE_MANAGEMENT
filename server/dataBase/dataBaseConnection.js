import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_SHOPPE",
    })
    .then(() => {
      console.log("Connected to dataBase successfully!");
    })
    .catch((err) => {
      console.log("Error while connecting to database: ", err);
    });
};
