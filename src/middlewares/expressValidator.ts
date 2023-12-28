import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const expressValidatorMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
    return;
  }

  next();
};

export default expressValidatorMiddleware;
