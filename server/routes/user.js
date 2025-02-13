import express from "express";
import { getUserInfo } from "../controllers/user.js";
import { verifyToken } from "../utils/verify.js";
const router = express.Router();

router.get("/", verifyToken, getUserInfo);

export default router;
