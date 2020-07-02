import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { sucessRegister, faildRegister, auth } from "../actions/userActions";
import { IUser } from "../types";
export const Register = () => {
  const { dispatch, state } = useContext(UserContext);
  const { isAuth } = state;
  const [userData, setUserData] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const { username, email, password } = userData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setErr("required field");
      } else if (password.length < 6) {
        setErr("password should be at least 6 characters");
      } else {
        const { data } = await axios.post("/signup", userData);
        dispatch(sucessRegister(data.token));
        if (data.token) {
          const user = await axios.get("/auth", {
            headers: {
              "x-auth-token": data.token,
            },
          });
          return dispatch(auth({ token: data.token, user: user.data }));
        }
      }
    } catch (error) {
      dispatch(faildRegister);
      setErr(error);
    }
  };
  if (isAuth) {
    return <Redirect to="/todos" />;
  }
  return (
    <form onSubmit={handleSubmit} className="container">
      <h2 className="display-1">Register</h2>
      {err && (
        <div className="alert alert-dismissible alert-danger">
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <strong>{err}</strong>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>

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
        Sign Up
      </button>
      <Link to="/login" className="big">
        already have an accunt?
      </Link>
    </form>
  );
};
