import { RequestHandler } from "express";
import User from "../model/user";
import Todo from "../model/todos";
import { IUser } from "../types";
// create todo
const createTodo: RequestHandler = async (req, res, next) => {
  const { user_id } = req.headers;
  const { title, iscompleted, description } = req.body;
  try {
    const todo = await Todo.create({
      title,
      iscompleted,
      description,
      user: user_id,
    });

    await todo.save();
    // console.log(user.todos);
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// get todos
const getAllTodos: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.headers;
    const todos = await Todo.find({ user: user_id });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// get a specific todo according to it's id
const getTodoById: RequestHandler = async (req, res, next) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findById(todoId);
    if (todo) {
      await todo.populate("user", "-password").execPopulate();
      return res.json(todo);
    } else {
      return res.status(401).json({ error: "Todo Is Not Exist" });
    }
  } catch (error) {
    next(error);
  }
};
// delet a specific todo according to it's id
const deleteTodoById: RequestHandler = async (req, res, next) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.deleteOne({ _id: todoId });
    if (todo) {
      return res.json({
        message: "todo is deleted",
      });
    } else {
      return res.status(401).json({ error: "Todo Is Not Exist" });
    }
  } catch (error) {
    next(error);
  }
};
const updateTodo: RequestHandler = async (req, res, next) => {
  const { todoId } = req.params;
  const { title, description, isCompleted } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, {
      title,
      description,
      isCompleted,
    });
    if (todo) {
      return res.json;
    }
  } catch (error) {
    next(error);
  }
};
export { createTodo, getTodoById, getAllTodos, deleteTodoById, updateTodo };
