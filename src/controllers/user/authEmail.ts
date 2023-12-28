import { Request, Response } from "express";

import Code from "../../models/code.js";
import { getRandomCode } from "../../utils/utils.js";
import {
  getRegisterCodeOptions,
  transporter,
} from "../../config/nodemailer.js";

const _preventMutipleCodesToSameUser = async (userEmail: string) => {
  const codeExists = await Code.findOne({ "onwer.email": userEmail });
  if (codeExists !== null) {
    await codeExists.deleteOne();
  }
};

const authEmail = async (request: Request, response: Response) => {
  const { email } = request.body;
  const requesterIp = request.ip;

  await _preventMutipleCodesToSameUser(email);

  // Store this code in database to compare it later
  const randomCode = getRandomCode();
  const storedCode = await Code.create({
    code: randomCode,
    onwer: { ip: requesterIp, email: email },
  });
  if (storedCode === null) {
    response.status(500).json({ message: "Register Code Bad Creation" });
    return;
  }

  // Send random code to email to auth it
  const emailOptions = getRegisterCodeOptions(email, randomCode);
  transporter.sendMail(emailOptions, (error) => {
    if (error !== null) {
      response.status(500).json({ message: "Cant Send Code" });
      return;
    }
  });

  response
    .status(200)
    .json({ message: "Keep Your Code ID To Register", codeId: storedCode._id });
};

export default authEmail;
