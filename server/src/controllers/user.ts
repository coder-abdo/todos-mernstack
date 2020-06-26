import { RequestHandler } from "express";
import { config } from "dotenv";
import { hash, genSalt, compare } from "bcryptjs";
import { sign, Secret } from "jsonwebtoken";
import User from "../model/user";
import { IUser } from "../types";
config();
export const signupControllers: RequestHandler = async (req, res, next) => {
  const { email, password, username } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ err: "Already Exist" });
  }
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = await new User({
      username,
      email,
      password: hashedPassword,
    });
    const secret = process.env.JWT_SECRET_TOKEN as Secret;
    const expiredDate = process.env.JWT_EXPIRED as any;

    await user.save();
    const token = sign({ id: user.id }, secret, { expiresIn: expiredDate });
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};
// Sign In auth

export const signInControllers: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = await req.body;
    const user = (await User.findOne({ email })) as IUser;
    // validate if the user exist or not
    if (!user) {
      return res.status(400).json({
        err: "email not exist",
      });
    }
    // validate if the password is correct
    const isPassword = await compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        err: "password incorrect",
      });
    }
    const secret = process.env.JWT_SECRET_TOKEN as Secret;
    const expiredDate = process.env.JWT_EXPIRED as any;

    const token = sign({ id: user._id }, secret, { expiresIn: expiredDate });
    return res.status(201).json({
      token,
      user: {
        email: user.email,
        username: user.username,
        id: user.id,
      },
    });
  } catch (err) {
    next(err);
  }
};
