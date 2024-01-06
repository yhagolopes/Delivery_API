import { Router } from "express";

import userController from "../controllers/user/user.js";
import authMiddlewares from "../middlewares/auth/auth.js";

const userRouter = Router();
userRouter.use(authMiddlewares.accessToken);

userRouter.post("/code", userController.authEmail);
userRouter.post(
  "/update-password",
  authMiddlewares.registerCode,
  userController.updatePassword
);

export default userRouter;
