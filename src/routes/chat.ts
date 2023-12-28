import { Router } from "express";

import chatController from "../controllers/chat/chat.js";
import authMiddlewares from "../middlewares/auth/auth.js";
import validationMiddlewares from "../middlewares/validations/validations.js";

const router = Router();
router.use(authMiddlewares.accessToken);

router.get("/:chatId", authMiddlewares.chatAccess, chatController.getMessages);
router.post(
  "/:chatId",
  authMiddlewares.chatAccess,
  validationMiddlewares.userMessage,
  chatController.sendMessage
);
router.post(
  "/:userId/create",
  authMiddlewares.chatCreation,
  chatController.create
);

export default router;
