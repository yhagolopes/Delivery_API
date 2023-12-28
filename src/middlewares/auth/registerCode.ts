import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";

// Maybe I shouldn't use the codeId
const authRegisterCode = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { codeId, code, email } = request.body;
  const requesterIp = request.ip as string;

  const error = await authErrors.registerCode(codeId, code, requesterIp, email);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default authRegisterCode;
