import React from "react";
import { ITodosFormProps } from "../types";
export const TodosForm = ({
  addTodoItem,
  todo,
  changeTodo,
}: ITodosFormProps) => {
  return (
    <form onSubmit={addTodoItem}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={todo.title}
          onChange={changeTodo}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          rows={3}
          className="form-control"
          value={todo.description}
          onChange={changeTodo}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-success btn-lg">
        Add
      </button>
    </form>
  );
};
