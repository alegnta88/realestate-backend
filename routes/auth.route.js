import { registerUser } from "../controllers/auth.controller.js";
import express from "express";
const authRouter = express.Router();


authRouter.post("/register", registerUser);

export default authRouter;