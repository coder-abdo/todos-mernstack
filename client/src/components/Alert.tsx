import React from "react";
import { IAlert } from "../types";
export const Alert = ({ msg, removeAlert }: IAlert) => {
  return (
    <div className="alert alert-danger">
      <button type="button" className="close" onClick={removeAlert}>
        &times;
      </button>
      <p>
        <strong>{msg}</strong>
      </p>
    </div>
  );
};
