import { Router } from "express";
import { auth } from "../controllers/auth";

const router = Router();

router.post("/auth", auth);
export default router;
