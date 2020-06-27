import React, { createContext, useReducer } from "react";
import { IProps, IUserData, IAction, ActionsTypes } from "../types";
export const UserContext = createContext<null | any>(null);
const initialState = {
  token: null,
  user: null,
  isAuth: false,
  loading: true,
} as IUserData;
const {
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  LOGIN_SUCESS,
  LOGIN_FAILD,
  LOGOUT,
  AUTH,
} = ActionsTypes;
const userReducer = (
  state = initialState,
  { type, payload }: IAction<IUserData | any>
) => {
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCESS:
      return { ...state, token: payload, isAuth: true, loading: false };
    case REGISTER_FAILD:
    case LOGIN_FAILD:
    case LOGOUT:
      return { ...state, token: null, isAuth: false, loading: false };
    case AUTH:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        loading: false,
      };
    default:
      return state;
  }
};
export default function UserProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
