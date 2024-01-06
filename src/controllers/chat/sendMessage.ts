import { Request, Response } from "express";

import saveMessageInDatabase from "../../utils/saveMessageInDatabase.js";
import getImageFromBuffer from "../../utils/getImageFromBuffer.js";
import getUserFromToken from "../../utils/getUserFromToken.js";
import { IMessage } from "../../models/chat.js";

const sendMessage = async (request: Request, response: Response) => {
  const { chatId } = request.params;
  const { accessToken, text, imageData } = request.body;

  const user = await getUserFromToken(accessToken);

  const imageBuffer: Buffer | undefined =
    imageData != undefined ? Buffer.from(imageData) : undefined;

  saveMessageInDatabase(chatId, {
    userId: user.public.id,
    text: text,
    image: await getImageFromBuffer(imageBuffer),
    sendedAt: Date.now(),
  } as IMessage);

  response.status(200).json({ message: "Sended" });
};

export default sendMessage;
