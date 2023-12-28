import { Request, Response, NextFunction } from "express";

import validationErrors from "../../errors/validations/validations.js";

const validateItem = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { name, price } = request.body;

  const error = await validationErrors.item(name, price);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default validateItem;
