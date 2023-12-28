import { Request, Response } from "express";

import saveMessageInDatabase from "../../utils/saveMessageInDatabase.js";
import { getStoredToken } from "../../utils/utils.js";
import { IMessage } from "../../utils/namespaces.js";
import getImageFromBuffer from "../../utils/getImageFromBuffer.js";

const sendMessage = async (request: Request, response: Response) => {
  const { chatId } = request.params;
  const { accessToken, text, imageData } = request.body;
  const { onwer } = await getStoredToken(accessToken);

  const imageBuffer: Buffer | undefined =
    imageData != undefined ? Buffer.from(imageData) : undefined;

  saveMessageInDatabase(chatId, {
    userId: onwer.publicId,
    text: text,
    image: await getImageFromBuffer(imageBuffer),
    sendedAt: Date.now(),
  } as IMessage);

  response.status(200).json({ message: "Sended" });
};

export default sendMessage;
