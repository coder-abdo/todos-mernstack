import { TodosActionsType, Ttodo, IAction } from "../types";
const { ADD_TODO, GET_TODOS, DELETE_TODO } = TodosActionsType;

const getTodos = (todos: Ttodo[]): IAction<Ttodo[]> => ({
  type: GET_TODOS,
  payload: todos,
});

const addTodo = (todo: Ttodo): IAction<Ttodo> => ({
  type: ADD_TODO,
  payload: todo,
});
const delteTodo = (id: string): IAction<string> => ({
  type: DELETE_TODO,
  payload: id,
});
export { getTodos, addTodo, delteTodo };
