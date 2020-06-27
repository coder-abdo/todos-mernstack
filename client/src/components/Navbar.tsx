import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";
export const Navbar = () => {
  const { state } = useContext(UserContext);
  let { isAuth } = state;
  console.log(isAuth);
  const guestUsers = (
    <>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">
          Register
        </NavLink>
      </li>
    </>
  );
  const authUser = (
    <>
      <li className="nav-item">
        <NavLink to="/todos">Todos</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/todos/create">Create</NavLink>
      </li>
      <li className="nav-item">
        <button className="btn btn-secondary my-2 my-sm-0">logout</button>
      </li>
    </>
  );
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
        <NavLink className="navbar-brand" to="/">
          My Todos
        </NavLink>
        <ul className="navbar-nav ml-auto">{isAuth ? authUser : guestUsers}</ul>
      </nav>
    </header>
  );
};
