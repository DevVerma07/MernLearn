import express from "express";
import { index, signup, login } from "../controllers/user-controller.js";

const router = express.Router();

router.get("/users", index);
router.post("/signup", signup);
router.post("/login", login);

export default router;
