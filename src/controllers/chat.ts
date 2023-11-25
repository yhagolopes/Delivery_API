import { Request, Response } from "express";

import Chat from "../models/chat.js";
import User from "../models/user.js";
import { getStoredToken } from "../utils/utils.js";

const _preventMutiplesChatWithSameUser = async (
  onwersToAdd: string[]
): Promise<string | null> => {
  const chatExists = await Chat.findOne({
    onwersId: { $in: [onwersToAdd, onwersToAdd.reverse()] },
  });
  if (chatExists !== null) {
    return chatExists._id as unknown as string;
  }

  return null;
};

const createChatWithUser = async (request: Request, response: Response) => {
  const { userChatId } = request.params;
  const { accessToken } = request.body;

  const requestedUser = await User.findOne({ chatId: userChatId });
  if (requestedUser === null) {
    response.status(400).json({ message: "User Chat Not Exists" });
    return;
  }
  const { onwer } = await getStoredToken(accessToken);
  const onwersToAdd = [onwer.id, requestedUser._id] as string[];

  const chatId = await _preventMutiplesChatWithSameUser(onwersToAdd);
  if (chatId !== null) {
    response.status(400).json({ chatId: chatId });
    return;
  }

  const storedChat = await Chat.create({ onwersId: onwersToAdd });
  if (storedChat === null) {
    response.status(500).json({ message: "Bad Creation" });
    return;
  }

  response.status(200).json({ chatId: storedChat._id });
};

const getMessages = async (request: Request, response: Response) => {
  const { chatId } = request.params;

  const requestedChat = await Chat.findOne({ _id: chatId });

  response.status(200).json({ chatMessages: requestedChat!.messages });
};

const sendMessage = async (request: Request, response: Response) => {
  const { chatId } = request.params;
  const { accessToken, text } = request.body;

  const requestedChat = await Chat.findOne({ _id: chatId });
  const { onwer } = await getStoredToken(accessToken);

  await requestedChat!.updateOne({
    $push: {
      messages: {
        userId: onwer.id,
        text: text,
        sendedAt: Date.now(),
      },
    },
  });

  response.status(200).json({ message: "Sended" });
};

export default {
  createChatWithUser,
  getMessages,
  sendMessage,
};
