import mongoose, { ConnectionOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongourl = process.env.MONGO_URI as string;
const mongoOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const mongoConnect = mongoose.connect(mongourl, mongoOptions, () => {
  console.log("connect to db");
});
