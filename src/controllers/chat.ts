import { Request, Response } from "express";

import Chat from "../models/chat.js";
import Token, { IToken } from "../models/token.js";
import User from "../models/user.js";
import { decodifyToken } from "../config/jsonwebtoken.js";
import { IAccessToken } from "../utils/interfaces.js";

const _existsOnwer = (onwerId: string, onwers: string[]): boolean => {
  for (let i = 0; i < onwers.length; i++) {
    if (onwerId === onwers[i]) return true;
  }
  return false;
};

const _getStoredToken = async (accessToken: string): Promise<IToken> => {
  // I should check it again?
  const decodedToken = decodifyToken(accessToken) as IAccessToken;
  const storedToken = (await Token.findOne({
    _id: decodedToken.tokenId,
  })) as IToken;

  return storedToken;
};

const createChatWithUser = async (request: Request, response: Response) => {
  const { userChatId } = request.params;
  const { accessToken } = request.body;

  const requestedUser = await User.findOne({ chatId: userChatId });
  if (requestedUser === null) {
    response.status(400).json({ message: "UNAUTHORIZED." });
    return;
  }
  const requesterToken = await _getStoredToken(accessToken);

  const onwersToAdd = [requesterToken.onwer.id, requestedUser._id] as string[];
  // Prevent user creates multiple chats with same user
  const existsChat = await Chat.findOne({
    onwersId: { $in: [onwersToAdd, onwersToAdd.reverse()] },
  });

  if (existsChat !== null) {
    response
      .status(200)
      .json({ message: "CHAT ALREADY EXISTS.", chatId: existsChat._id });
    return;
  }

  const storedChat = await Chat.create({
    onwersId: onwersToAdd,
  });
  if (storedChat === null) {
    response.status(500).json({ message: "CAN'T CREATE USER CHAT." });
    return;
  }

  response
    .status(200)
    .json({ message: "USER CHAT SUCCESSFUL CREATED.", chatId: storedChat._id });
};

const getMessages = async (request: Request, response: Response) => {
  const { chatId } = request.params;
  const { accessToken } = request.body;

  const requestedChat = await Chat.findOne({ _id: chatId });
  if (requestedChat === null) {
    response.status(500).json({ message: "UNAUTHORIZED." });
    return;
  }

  const storedToken = await _getStoredToken(accessToken);
  // Checks if the user are an onwer
  const existsOnwer = _existsOnwer(
    storedToken.onwer.id,
    requestedChat.onwersId
  );
  if (!existsOnwer) {
    response.status(500).json({ message: "UNAUTHORIZED." });
    return;
  }

  response
    .status(200)
    .json({ message: "AUTHORIZED", chatMessages: requestedChat.messages });
};

const sendMessage = async (request: Request, response: Response) => {
  const { chatId } = request.params;
  const { accessToken, text } = request.body;

  const requestedChat = await Chat.findOne({
    _id: chatId,
  });
  if (requestedChat === null) {
    response.status(400).json({ message: "UNAUTHORIZED." });
    return;
  }

  const storedToken = await _getStoredToken(accessToken);
  // Checks if the user are an onwer
  const existsOnwer = _existsOnwer(
    storedToken.onwer.id,
    requestedChat.onwersId
  );
  if (!existsOnwer) {
    response.status(500).json({ message: "UNAUTHORIZED." });
    return;
  }

  await requestedChat.updateOne({
    $push: {
      messages: {
        userId: storedToken.onwer.id,
        text: text,
        sendedAt: Date.now(),
      },
    },
  });

  response.status(200).json({ message: "SENDED." });
};

export default {
  createChatWithUser,
  getMessages,
  sendMessage,
};
