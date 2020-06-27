import { Router } from "express";
import { signupControllers, signInControllers } from "../controllers/user";
const router = Router();
export const signupRoute = router.post("/signup", signupControllers);
export const signinRoute = router.post("/login", signInControllers);
