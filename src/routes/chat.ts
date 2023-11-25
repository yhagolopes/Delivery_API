import { Router } from "express";

import authTokenId from "../middlewares/auth.js";
import chatController from "../controllers/chat.js";
import validations from "../middlewares/validations.js";

const router = Router();
router.use(authTokenId);
router.get("/:chatId", validations.chatAccess, chatController.getMessages);

router.post("/:chatId", validations.chatAccess, chatController.sendMessage);

router.post("/:userChatId/create", chatController.createChatWithUser);

export default router;
