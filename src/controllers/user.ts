import { Request, Response } from "express";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";

import Code from "../models/code.js";
import User from "../models/user.js";
import Token from "../models/token.js";
import { getRandomCode } from "../utils/utils.js";
import { transporter, getRegisterCodeOptions } from "../config/nodemailer.js";
import { createTemporaryToken } from "../config/jsonwebtoken.js";

const _preventMutipleCodesToSameUser = async (userEmail: string) => {
  const codeExists = await Code.findOne({ "requester.email": userEmail });
  if (codeExists !== null) {
    await codeExists.deleteOne();
  }
};

const _preventMutipleTokensToSameUser = async (userId: string) => {
  const tokenExists = await Token.findOne({ "onwer.id": userId });
  if (tokenExists !== null) {
    await tokenExists.deleteOne();
  }
};

const register = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // Codify password for security
  // Nobody know your real password
  const codifiedPassword = await hash(password, 10);
  const storedUser = await User.create({
    name: "John Doe",
    email: email,
    codifiedPassword: codifiedPassword,
    chatId: randomUUID(),
  });
  if (storedUser === null) {
    response.status(500).json({ message: "Bad User Creation" });
    return;
  }

  response.status(200).json({ message: "User Created" });
};

// This code is being confuse
// I should refactor it in steps
const login = async (request: Request, response: Response) => {
  const { email } = request.body;
  const requesterIp = request.ip;

  const requestedUser = await User.findOne({ email: email });

  await _preventMutipleTokensToSameUser(
    requestedUser!._id as unknown as string
  );

  // Create and store a token with user
  // inforamtions to compare it later
  const storedToken = await Token.create({
    onwer: {
      id: requestedUser!._id,
      ip: requesterIp,
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

const generateCodeAndSendToEmail = async (
  request: Request,
  response: Response
) => {
  const { email } = request.body;
  const requesterIp = request.ip;

  await _preventMutipleCodesToSameUser(email);

  // Create and store code with user informations
  // to compare it later
  const randomCode = getRandomCode();
  const storedCode = await Code.create({
    code: randomCode,
    requester: {
      ip: requesterIp,
      email: email,
    },
  });
  if (storedCode === null) {
    response.status(500).json({ message: "Register Code Bad Creation" });
    return;
  }

  // Send code to user's email requested
  const emailOptions = getRegisterCodeOptions(email, randomCode);
  transporter.sendMail(emailOptions, (error) => {
    if (error !== null) {
      response.status(500).json({ message: "Code Not Sended" });
      return;
    }
  });

  response
    .status(200)
    .json({ message: "Keep Your Code ID To Register", codeId: storedCode._id });
};

export default {
  login,
  register,
  generateCodeAndSendToEmail,
};
