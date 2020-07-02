export interface IProps {
  children?: JSX.Element;
}
export interface IUser {
  username?: string;
  email: string;
  password: string;
  id?: string;
}
export interface IUserData {
  token: string | null;
  user: IUser | null;
  isAuth: boolean;
  loading?: boolean;
}
export interface IAction<T> {
  type: string;
  payload: T;
}
export interface IAlert {
  msg: string;
  removeAlert: () => void;
}
export type Ttodo = {
  title: string;
  description?: string;
  _id?: string;
  isCompleted: boolean;
};
export interface ITodos {
  todos: Ttodo[];
  user?: IUser;
  loading?: boolean;
}
export interface ITodoProps {
  todo: Ttodo;
  deleteTodo: any;
}
export interface ITodosFormProps {
  todo: Ttodo;
  changeTodo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addTodoItem: (e: React.FormEvent) => void;
}
export enum ActionsTypes {
  REGISTER_SUCCESS = "REGISTER_SUCESS",
  REGISTER_FAILD = "REGISTER_FAILD",
  LOGIN_SUCESS = "LOGIN_SUCCESS",
  LOGIN_FAILD = "LOGIN_FAILD",
  LOGOUT = "LOGOUT",
  AUTH = "AUTH",
}
export enum TodosActionsType {
  ADD_TODO = "ADD_TODO",
  GET_TODOS = "GET_TODOS",
  UPDATE_TODO = "UPDATE_TODO",
  DELETE_TODO = "DELET_TODO",
}
