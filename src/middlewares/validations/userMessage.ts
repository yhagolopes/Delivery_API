import { Request, Response, NextFunction } from "express";

import validationErrors from "../../errors/validations/validations.js";

const validateUserMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { text, imageData } = request.body;
  const imageBuffer: Buffer | undefined =
    imageData != undefined ? Buffer.from(imageData) : undefined;

  const error = await validationErrors.userMessage(text, imageBuffer);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default validateUserMessage;
