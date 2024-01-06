import { Request, Response } from "express";

import User, { IAccessToken, IPublicProfile } from "../../models/user.js";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { createTemporaryToken } from "../../config/jsonwebtoken.js";

const register = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const requesterIp = request.ip as string;

  const encrypted = await hash(password, 10);
  const storedUser = await User.create({
    public: {
      id: randomUUID(),
      name: "John Doe",
    } as IPublicProfile,

    email: email,
    password: encrypted,

    accessToken: {
      id: randomUUID(),
      ip: requesterIp,
      createdAt: Date.now(),
    } as IAccessToken,
  });
  if (storedUser === null) {
    response.status(500).json({ message: "Bad User Creation" });
    return;
  }

  const accessToken = createTemporaryToken({
    tokenId: storedUser.accessToken.id,
  });
  response.status(200).json({
    message: "User Created. Keep Your Access Token Secure",
    accessToken: accessToken,
  });
};

export default register;
