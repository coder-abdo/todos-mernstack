import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { mongoConnect } from "./config/index";
import { signupRoute, signinRoute } from "./routes/user";
import todosRoute from "./routes/todosRoute";
import authRoute from "./routes/auth";
import {
  errorMiddleWare,
  errorMiddleWareHandler,
} from "./controllers/errorHandler";
dotenv.config();
const app = express();
const port = process.env.PORT;
(async () => {
  // database connection
  await mongoConnect;
  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  // routes
  app.use(signupRoute);
  app.use(signinRoute);
  app.use(todosRoute);
  app.use(authRoute);
  app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });
  app.use(errorMiddleWare);
  app.use(errorMiddleWareHandler);
})();
app.listen(port, () => console.log(`server run at port: ${port}`));
