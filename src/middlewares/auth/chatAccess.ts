import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";

const authChatAccess = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { chatId } = request.params;
  const { accessToken } = request.body;

  const error = await authErrors.chatAccess(chatId, accessToken);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default authChatAccess;
