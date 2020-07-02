import React, { createContext, useReducer, Dispatch } from "react";
import { TodosActionsType, ITodos, Ttodo, IAction, IProps } from "../types";
const { ADD_TODO, GET_TODOS, DELETE_TODO } = TodosActionsType;

const initialState: ITodos = {
  todos: [],
  loading: true,
};

export const todosContext = createContext<
  | {
      state: ITodos;
      dispatch: Dispatch<any>;
    }
  | any
>({});

const todosReducer = (
  state = initialState,
  { type, payload }: IAction<ITodos | any>
) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            ...payload,
          },
        ],
        loading: false,
      };
    case DELETE_TODO:
      const filteredTodos: Ttodo[] = state.todos.filter(
        (todo: Ttodo) => todo._id !== payload
      );
      return { ...state, todos: filteredTodos, loading: false };
    case GET_TODOS:
      return { ...state, todos: payload, loading: false };
    default:
      return state;
  }
};

const TodosProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const value = { state, dispatch };
  //   console.log("value", value);
  return (
    <todosContext.Provider value={value}>{children}</todosContext.Provider>
  );
};
export default TodosProvider;
