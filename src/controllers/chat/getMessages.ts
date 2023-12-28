import { Request, Response } from "express";

import Chat from "../../models/chat.js";

const getMessages = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  const requestedChat = await Chat.findOne({ _id: chatId });
  response.status(200).json({ chatMessages: requestedChat!.messages });
};

export default getMessages;
