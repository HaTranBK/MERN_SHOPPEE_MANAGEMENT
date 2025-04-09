import mongoose from "mongoose";

export const dbConnection = () => {
  console.log("MONGO_URI: ", process.env.MONGO_URI);
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
