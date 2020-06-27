import { Router } from "express";
import { auth, getAuth } from "../controllers/auth";
import { auth as authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/auth", auth);
router.get("/auth", authMiddleware, getAuth);
export default router;
