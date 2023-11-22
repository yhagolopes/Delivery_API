import { Request, Response, NextFunction } from "express";

import { decodifyToken } from "../config/jsonwebtoken.js";
import Token, { TOKEN_EXPIRES_IN } from "../models/token.js";
import { IAccessToken } from "../utils/interfaces.js";

// To access another features in API
// You need to be logged and have a unique Access Token
// This will be verified in all routes
const authTokenId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.body;
  const requesterIp = request.ip;

  const decodedToken = decodifyToken(accessToken) as IAccessToken | null;
  if (decodedToken === null) {
    response.status(401).json({ message: "UNAUTHOURIZED." });
    return;
  }

  const storedToken = await Token.findOne({ _id: decodedToken.tokenId });
  if (storedToken === null || storedToken.onwer.ip != requesterIp) {
    response.status(401).json({ message: "UNAUTHOURIZED." });
    return;
  }

  const elapsedTime: number = storedToken.createdAt + TOKEN_EXPIRES_IN;
  if (Date.now() > elapsedTime) {
    response.status(401).json({ message: "TOKEN EXPIRED." });
    await storedToken.deleteOne();
    return;
  }

  next();
};

export default authTokenId;
