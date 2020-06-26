import { config } from "dotenv";
import { verify } from "jsonwebtoken";
import { RequestHandler, Response, NextFunction } from "express";
import { IReq, TVerfiedToken } from "../types";
config();
export const auth: RequestHandler = async (
  req: IReq | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ error: "no token, authentication denied" });
    }
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const verfiedToken = (await verify(token, secret)) as TVerfiedToken;
    if (!verfiedToken) {
      return res
        .status(401)
        .json({ error: "token verification failed, authorization denied" });
    }
    req.user = verfiedToken.id;
    next();
  } catch (err) {
    next(err);
  }
};
