import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import Code, { CODE_EXPIRES_IN } from "../models/code.js";

export const handleInputErrors = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
    return;
  }

  next();
};

// Maybe I shouldn't use the codeId
export const verifyCodeSendedToEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { codeId, code, email } = request.body;
  const requesterIp = request.ip;

  const requestedCode = await Code.findOne({ _id: codeId });
  if (
    requestedCode === null ||
    requestedCode.code != code ||
    requestedCode.requester.ip != requesterIp ||
    requestedCode.requester.email != email
  ) {
    response.status(401).json({ message: "CODE DOESN'T EXIST." });
    return;
  }

  const elapsedTime: number = requestedCode.createdAt + CODE_EXPIRES_IN;
  if (Date.now() > elapsedTime) {
    response.status(401).json({ message: "CODE EXPIRED." });
    await requestedCode.deleteOne();
    return;
  }

  // If code verified, then delete it
  await requestedCode.deleteOne();

  next();
};
