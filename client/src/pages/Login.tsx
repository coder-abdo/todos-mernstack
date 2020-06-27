import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { successLogin, faildLogin } from "../actions/userActions";
import { IUser } from "../types";
import { UserContext } from "../context/userContext";
export const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", user);
      dispatch(successLogin(data.token));
      history.push("/todos");
    } catch (err) {
      dispatch(faildLogin());
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="display-1">Welcome Back</h2>

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
