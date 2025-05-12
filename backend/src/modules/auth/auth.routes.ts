import express from "express";
import { checkAuth, signup , login } from "./controller/auth.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.get("/check", protectRoute , checkAuth )
authRoutes.post("/login", login);

export default authRoutes;