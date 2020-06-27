import React from "react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <div className="jumbotron mt-5">
        <h1 className="display-3">Todos App</h1>
        <p className="lead">
          using todos app mkae your precious time safer than any time before.
          hurry and orgnize your tasks easily by just drag and drop tasks.
        </p>
        <hr className="my-4" />
        <div className="d-flex">
          <Link to="/login" className="btn btn-primary btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary btn-lg">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};
