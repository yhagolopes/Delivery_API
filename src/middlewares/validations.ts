import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import validateRegisterCode from "../validations/registerCode.js";
import chatValidations from "../validations/chat.js";
import userValidations from "../validations/user.js";

export const input = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(request);
  if (!validationErrors.isEmpty()) {
    response
      .status(400)
      .json({ errors: validationErrors.array().map((error) => error.msg) });
    return;
  }

  next();
};

// Maybe I shouldn't use the codeId
export const registerCode = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { codeId, code, email } = request.body;
  const requesterIp = request.ip as string;

  const validationErrors = await validateRegisterCode(
    codeId,
    code,
    requesterIp,
    email
  );
  if (validationErrors !== null) {
    response.status(400).json({ message: validationErrors });
    return;
  }

  next();
};

export const chatAccess = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { chatId } = request.params;
  const { accessToken } = request.body;

  const validationErrors = await chatValidations.access(chatId, accessToken);
  if (validationErrors !== null) {
    response.status(400).json({ message: validationErrors });
    return;
  }

  next();
};

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.params;

  const validationErrors = await userValidations.login(email, password);
  if (validationErrors !== null) {
    response.status(400).json({ message: validationErrors });
    return;
  }

  next();
};

export default {
  input,
  registerCode,
  chatAccess,
  login,
};
