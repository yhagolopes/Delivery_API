import { Request, Response } from "express";

import User, { IAccessToken } from "../../models/user.js";
import { createTemporaryToken } from "../../config/jsonwebtoken.js";
import { randomUUID } from "crypto";

const login = async (request: Request, response: Response) => {
  const { email } = request.body;
  const requesterIp = request.ip as string;

  const newAccessToken: IAccessToken = {
    id: randomUUID(),
    ip: requesterIp,
    createdAt: Date.now(),
  };

  const updatedAccessToken = await User.findOneAndUpdate(
    { email: email },
    { $set: { accessToken: newAccessToken } },
    { new: true }
  );
  if (updatedAccessToken === null) {
    response.status(500).json({ message: "Something Is Wrong" });
    return;
  }

  // Creates a codified token to prevent
  // brute force attacks to token id
  const accessToken = createTemporaryToken({
    tokenId: updatedAccessToken.accessToken.id,
  });
  response.status(200).json({
    message: "Keep Your Access Token Secure",
    accessToken: accessToken,
  });
};

export default login;
