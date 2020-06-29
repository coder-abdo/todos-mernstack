import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { IUserData } from "../types";
export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { state }: { state: IUserData } = useContext(UserContext);
  const { isAuth, loading } = state;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
