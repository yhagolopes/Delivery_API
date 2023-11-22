import { config } from "dotenv";
config();

import jwt from "jsonwebtoken";

const PRIVATE_KEY: string = process.env.TOKEN_PRIVATE_KEY || "";

export const createTemporaryToken = (payloads: {}): string => {
  const temporaryToken = jwt.sign(payloads, PRIVATE_KEY, { expiresIn: "2d" });
  return temporaryToken;
};

export const decodifyToken = (token: string): {} | null => {
  try {
    const decodedToken = jwt.verify(token, PRIVATE_KEY) as {};
    return decodedToken;
  } catch {
    return null;
  }
};
