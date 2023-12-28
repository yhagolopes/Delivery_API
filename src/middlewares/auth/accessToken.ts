import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";

// To access another features in API
// You need to be logged and have a unique Access Token
// This will be verified in all routes
const authAccessToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.body;
  const requesterIp = request.ip as string;

  const error = await authErrors.accessToken(accessToken, requesterIp);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default authAccessToken;
