import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  username: string;
  id?: string;
  email: string;
  password: string;
  todos: ITodo[] | any;
}

export interface ITodo extends Document {
  user: IUser;
  title: string;
  id?: string;
  description?: string;
  isCompleted: boolean;
}
export interface IReq extends Request {
  user?: string;
}
export type TVerfiedToken = {
  id: string;
};
