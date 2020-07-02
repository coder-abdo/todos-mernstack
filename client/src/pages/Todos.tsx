import React, { useState, useContext, Dispatch, useEffect } from "react";
import axios from "axios";
import { addTodo, getTodos, delteTodo } from "../actions/todosActions";
import { ITodos, Ttodo } from "../types";
import { todosContext } from "../context/todosContext";
import { UserContext } from "../context/userContext";
import { TodosForm } from "../components/TodosForm";
import { Todo } from "../components/Todo";
import { Alert } from "../components/Alert";
import { Loader } from "../components/Loader";
export const Todos = () => {
  const { state, dispatch } = useContext<{
    state: ITodos;
    dispatch: Dispatch<any>;
  }>(todosContext);
  const { state: userState } = useContext(UserContext);
  const [todo, setTodo] = useState<Ttodo>({
    title: "",
    description: "",
    isCompleted: false,
  });
  // delete todo item
  const deleteTodo = async (id: string | any) => {
    try {
      // eslint-disable-next-line
      const { data } = await axios.delete(`/todos/${id}`, {
        headers: {
          "x-auth-token": userState.token,
        },
      });
      dispatch(delteTodo(id));
    } catch (error) {
      if (error) {
        setErr(error.response.data.err);
      }
    }
  };
  const changeTodo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const addTodoItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setErr("faild is required");
    } else {
      try {
        const { data } = await axios.post("todos/create", todo, {
          headers: {
            "x-auth-token": userState.token,
            user_id: userState.user?._id,
          },
        });
        dispatch(addTodo(data));
      } catch (error) {
        if (error) {
          setErr(error.response?.data.err);
        }
      }
      setTodo({
        title: "",
        isCompleted: false,
        description: "",
      });
    }
  };
  const { title, description } = todo;
  const [err, setErr] = useState("");
  const getAllTodos = async () => {
    try {
      const { data } = await axios.get("/todos", {
        headers: {
          "x-auth-token": userState.token,
          user_id: userState.user?._id,
        },
      });

      dispatch(getTodos(data));
    } catch (error) {
      if (error) {
        setErr(error.response?.data.err);
      }
    }
  };
  useEffect(() => {
    getAllTodos();
    // eslint-disable-next-line
  }, [userState.user]);
  return (
    <div className="container py-5">
      <h2 className="h2">
        Welcome <strong>{userState.user?.username}</strong>
      </h2>
      {err && (
        <Alert
          msg={err}
          removeAlert={() => {
            setErr("");
          }}
        />
      )}
      <TodosForm
        todo={todo}
        addTodoItem={addTodoItem}
        changeTodo={changeTodo}
      />
      {state.todos ? (
        state?.todos.length > 0 ? (
          <ul className="list-group py-5">
            {state.todos.map((todo: Ttodo) => (
              <Todo
                key={todo._id}
                todo={todo}
                deleteTodo={() => deleteTodo(todo._id)}
              />
            ))}
          </ul>
        ) : (
          <h3 className="h3">there is no todos yet</h3>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};
