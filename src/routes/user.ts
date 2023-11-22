import { Router, Request, Response } from "express";
import authTokenId from "../middlewares/auth.js";

import chatController from "../controllers/chat.js";

const helloWord = (request: Request, response: Response) => {
  response.status(200).send("Hello Word");
};

const router = Router();
router.use(authTokenId);

router.get("/", helloWord);

router.get("/chat/:chatId", chatController.getMessages);
router.post("/chat/:chatId", chatController.sendMessage);
router.post("/chat/:userChatId/create", chatController.createChatWithUser);

export default router;
