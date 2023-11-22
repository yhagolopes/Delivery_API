import { Router } from "express";

import userController from "../controllers/user.js";
import { validateEmail, validatePassword } from "../validations/user.js";
import {
  handleInputErrors,
  verifyCodeSendedToEmail,
} from "../middlewares/validations.js";

const router = Router();
router.post(
  "/code",
  validateEmail(),
  handleInputErrors,
  userController.generateCodeAndSendToEmail
);

// I don't need validate email again.
// Maybe I should store email with code and just read it
router.post(
  "/register",
  validatePassword(),
  handleInputErrors,
  verifyCodeSendedToEmail,
  userController.register
);

// Do I really need validate email and password?
router.post("/login", userController.logIn);

export default router;
