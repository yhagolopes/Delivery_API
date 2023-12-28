import { Request, Response, NextFunction } from "express";

import validationErrors from "../../errors/validations/validations.js";

const validateImage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { imageData } = request.body;

  const imageBuffer = Buffer.from(imageData);
  const error = await validationErrors.image(imageBuffer);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default validateImage;
