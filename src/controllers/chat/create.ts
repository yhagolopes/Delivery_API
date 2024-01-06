import { Request, Response } from "express";

import Chat from "../../models/chat.js";
import getUserFromToken from "../../utils/getUserFromToken.js";

const create = async (request: Request, response: Response) => {
  const { userId } = request.params;
  const { accessToken } = request.body;

  const user = await getUserFromToken(accessToken);

  const members: string[] = [userId, user.public.id];
  const storedChat = await Chat.create({ members: members });
  if (storedChat === null) {
    response.status(500).json({ message: "Chat Bad Creation" });
    return;
  }

  response
    .status(200)
    .json({ message: "Chat Created", chatId: storedChat._id });
};

export default create;
