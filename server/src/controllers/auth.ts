import { RequestHandler, Response, NextFunction } from "express";
import User from "../model/user";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
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
      return res.json(false);
    }
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const verfiedToken = (await verify(token, secret)) as TVerfiedToken;
    if (!verfiedToken) {
      return res.json(false);
    }
    const user = await User.findById(verfiedToken.id).select("-password");
    if (!user) {
      return res.json(false);
    }
    res.json(true);
  } catch (err) {
    next(err);
  }
};

export const getAuth: RequestHandler = async (
  req: IReq | any,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
};
