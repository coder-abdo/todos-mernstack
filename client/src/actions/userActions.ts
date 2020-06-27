import { ActionsTypes, IUser } from "../types";

const {
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  LOGIN_SUCESS,
  AUTH,
  LOGIN_FAILD,
  LOGOUT,
} = ActionsTypes;

const sucessRegister = (token: string) => ({
  type: REGISTER_SUCCESS,
  payload: token,
});
const faildRegister = () => ({ type: REGISTER_FAILD });
const successLogin = (token: string) => ({
  type: LOGIN_SUCESS,
  payload: token,
});
const faildLogin = () => ({ type: LOGIN_FAILD });

const logout = () => ({ type: LOGOUT });
const auth = ({ token, user }: { token: string; user: IUser }) => ({
  type: AUTH,
  payload: { token, user },
});

export {
  auth,
  sucessRegister,
  successLogin,
  logout,
  faildRegister,
  faildLogin,
};
