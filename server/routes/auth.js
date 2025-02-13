import express from "express";
import { register, login, logout, checkToken } from "../controllers/auth.js";
import { verifyToken } from "../utils/verify.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/verify", verifyToken, checkToken);

export default router;
