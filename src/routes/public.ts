import { Router } from "express";

import userController from "../controllers/user/user.js";
import itemController from "../controllers/item/item.js";

import expressValidatorChains from "../errors/expressValidator.js";
import expressValidatorMiddleware from "../middlewares/expressValidator.js";
import authMiddlewares from "../middlewares/auth/auth.js";

const router = Router();

router.post(
  "/code",
  expressValidatorChains.userEmail,
  expressValidatorMiddleware,
  userController.authEmail
);
// I don't need validate email again.
// Maybe I should store email with code and just read it
router.post(
  "/register",
  expressValidatorChains.userPassword,
  expressValidatorMiddleware,
  authMiddlewares.registerCode,
  userController.register
);
// Do I really need validate email and password?
router.post("/login", authMiddlewares.userLogin, userController.login);
router.get("/items", itemController.get);

export default router;
