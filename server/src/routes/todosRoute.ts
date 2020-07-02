import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  deleteTodoById,
  getTodoById,
  updateTodo,
} from "../controllers/todosController";
import { auth } from "../middleware/auth";
const router = Router();
router.post("/todos/create", auth, createTodo);
router.get("/todos", auth, getAllTodos);
router.get("/todos/:todoId", auth, getTodoById);
router.delete("/todos/:todoId", auth, deleteTodoById);
router.put("/todos/:todoId", updateTodo);
export default router;
