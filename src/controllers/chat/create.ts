import { Request, Response } from "express";

import User from "../../models/user.js";
import Chat from "../../models/chat.js";

import { getStoredToken } from "../../utils/utils.js";

const create = async (request: Request, response: Response) => {
  const { userId } = request.params;
  const { accessToken } = request.body;

  const requestedUser = await User.findOne({ "public.id": userId });
  const { onwer } = await getStoredToken(accessToken);

  const onwersToAdd = [onwer.publicId, requestedUser!.public.id];

  const storedChat = await Chat.create({
    onwersId: onwersToAdd,
  });
  if (storedChat === null) {
    response.status(500).json({ message: "Chat Bad Creation" });
    return;
  }

  response
    .status(200)
    .json({ message: "Chat Created", chatId: storedChat._id });
};

export default create;
