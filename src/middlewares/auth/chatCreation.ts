import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";

const authChatCreation = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { userId } = request.params;
  const { accessToken } = request.body;

  const { error, chatId } = await authErrors.chatCreation(userId, accessToken);
  if (error !== null) {
    response.status(400).json({ message: error, chatId: chatId });
    return;
  }

  next();
};

export default authChatCreation;
