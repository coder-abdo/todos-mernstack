import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  deleteTodoById,
  getTodoById,
} from "../controllers/todosController";
import { auth } from "../middleware/auth";
const router = Router();
router.post("/todos/create", auth, createTodo);
router.get("/todos", getAllTodos);
router.get("/todos/:todoId", auth, getTodoById);
router.delete("/todos/:todoId", auth, deleteTodoById);
export default router;
