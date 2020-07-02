import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { logout } from "../actions/userActions";
import { FaBars } from "react-icons/fa";
export const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  let { isAuth } = state;
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleMenu = () => {
    setIsToggle(!isToggle);
  };
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
      <li className="nav-item mr-lg-2 mb-sm-2 fz-lg fz-sm">
        <NavLink to="/todos">Todos</NavLink>
      </li>

      <li className="nav-item">
        <button
          className="btn btn-secondary my-2 my-sm-0"
          onClick={handleLogout}
        >
          logout
        </button>
      </li>
    </>
  );
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light pos-rv">
        <NavLink className="navbar-brand" to="/">
          My Todos
        </NavLink>
        <FaBars className="menu-btn" onClick={toggleMenu} />
        <ul
          className={`navbar-nav ml-auto flexy drop-down ${isToggle && "show"}`}
        >
          {isAuth ? authUser : guestUsers}
        </ul>
      </nav>
    </header>
  );
};
