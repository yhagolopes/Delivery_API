import { Request, Response } from "express";
import { Types } from "mongoose";

import Token from "../../models/token.js";
import User from "../../models/user.js";
import { createTemporaryToken } from "../../config/jsonwebtoken.js";

const _preventMutipleTokensToSameUser = async (userId: Types.ObjectId) => {
  const tokenExists = await Token.findOne({ _id: userId });
  if (tokenExists !== null) {
    await tokenExists.deleteOne();
  }
};

const login = async (request: Request, response: Response) => {
  const { email } = request.body;
  const requesterIp = request.ip;

  const requestedUser = await User.findOne({ email: email });

  await _preventMutipleTokensToSameUser(requestedUser!._id);

  // Create and store a token with user
  // inforamtions to compare it later
  const storedToken = await Token.create({
    onwer: {
      publicId: requestedUser!.public.id,
      ip: requesterIp,
      email: requestedUser!.email,
    },
  });
  if (storedToken === null) {
    response.status(400).json({ message: "Access Token Bad Creation" });
    return;
  }

  // Creates a codified token to prevent
  // brute force attacks to token id
  const accessToken = createTemporaryToken({ tokenId: storedToken._id });

  response.status(200).json({
    message: "Keep Your Access Token Secure",
    accessToken: accessToken,
  });
};

export default login;
