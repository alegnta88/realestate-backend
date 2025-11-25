import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import express from "express";
const authRouter = express.Router();


authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;