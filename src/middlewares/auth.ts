import { Request, Response, NextFunction } from "express";

import validateAccessToken from "../validations/accessToken.js";

// To access another features in API
// You need to be logged and have a unique Access Token
// This will be verified in all routes
const authTokenId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.body;
  const requesterIp = request.ip as string;

  const validationErrors = await validateAccessToken(accessToken, requesterIp);
  if (validationErrors !== null) {
    response.status(400).json({ message: validationErrors });
    return;
  }

  next();
};

export default authTokenId;
