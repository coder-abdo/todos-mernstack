export interface IProps {
  children?: JSX.Element;
}
export interface IUser {
  username?: string;
  email: string;
  password: string;
  id?: string;
}
export interface IUserData {
  token: string | null;
  user: IUser | null;
  isAuth: boolean;
  loading?: boolean;
}
export interface IAction<T> {
  type: string;
  payload: T;
}
export interface IAlert {
  msg: string;
  removeAlert: () => void;
}
export enum ActionsTypes {
  REGISTER_SUCCESS = "REGISTER_SUCESS",
  REGISTER_FAILD = "REGISTER_FAILD",
  LOGIN_SUCESS = "LOGIN_SUCCESS",
  LOGIN_FAILD = "LOGIN_FAILD",
  LOGOUT = "LOGOUT",
  AUTH = "AUTH",
}
