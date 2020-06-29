import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Alert } from "../components/Alert";
import { successLogin, faildLogin, auth } from "../actions/userActions";
import { IUser } from "../types";
import { UserContext } from "../context/userContext";
export const Login = () => {
  const { dispatch, state } = useContext(UserContext);
  const { isAuth } = state;
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const { email, password } = user;
  console.log(isAuth);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", user);
      dispatch(successLogin(data.token));
      if (data.token) {
        const user = await axios.get("/auth", {
          headers: {
            "x-auth-token": data.token,
          },
        });
        dispatch(auth({ token: data.token, user: user.data }));
      }
    } catch (err) {
      let Err = err.response.data.err;
      dispatch(faildLogin());
      setError(Err);
    }
  };
  if (isAuth) {
    return <Redirect to="/todos" />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="display-1">Welcome Back</h2>
      {error && (
        <Alert
          msg={error}
          removeAlert={() => {
            setError("");
          }}
        />
      )}
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-lg mr-2">
        Login
      </button>
      <Link to="/login" className="big">
        have not an account yet?
      </Link>
    </form>
  );
};
