import express from "express";
import { index, signup, login } from "../controllers/user-controller.js";
import { check } from "express-validator";

const router = express.Router();

router.get("/users", index);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);
router.post("/login", login);

export default router;
