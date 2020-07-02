import React from "react";
import { ITodoProps } from "../types";
import { FaTrash } from "react-icons/fa";
export const Todo = ({ todo, deleteTodo }: ITodoProps) => {
  const { title, description } = todo;
  return (
    <li className="list-group-item d-flex flex-column">
      <h3 className="h3">{title}</h3>
      <p className="lead">{description}</p>
      <button className="delete-btn" onClick={deleteTodo}>
        <FaTrash className="trash-icon" />
      </button>
    </li>
  );
};
