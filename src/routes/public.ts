import { Router } from "express";

import userController from "../controllers/user.js";
import userValidations from "../validations/user.js";
import validations from "../middlewares/validations.js";

const router = Router();
router.post(
  "/code",
  userValidations.inputEmail(),
  validations.input,
  userController.generateCodeAndSendToEmail
);

// I don't need validate email again.
// Maybe I should store email with code and just read it
router.post(
  "/register",
  userValidations.inputPassword(),
  validations.input,
  validations.registerCode,
  userController.register
);

// Do I really need validate email and password?
router.post("/login", validations.login, userController.login);

export default router;
