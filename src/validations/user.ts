import { ValidationChain, body } from "express-validator";
import { compare } from "bcrypt";

import User from "../models/user.js";

export const inputEmail = (): ValidationChain => {
  return body("email")
    .notEmpty()
    .withMessage("Email Required")

    .isLength({ max: 64 })
    .withMessage("Email Too Long")

    .isEmail()
    .withMessage("Invalid Email")

    .custom(async (email: string) => {
      const user = await User.findOne({ email });
      if (user !== null) {
        throw new Error("Email Already Exists");
      }
    });
};

export const inputPassword = (): ValidationChain => {
  return body("password")
    .notEmpty()
    .withMessage("Password Required")

    .isLength({ min: 6, max: 12 })
    .withMessage("Passwords Must Be 6-12");
};

export const login = async (
  userEmail: string,
  userPassword: string
): Promise<string | null> => {
  const requestedUser = await User.findOne({ email: userEmail });
  if (requestedUser === null) return "Try Again";

  const isPasswordCorrect: boolean = await compare(
    userPassword,
    requestedUser.codifiedPassword
  );
  if (!isPasswordCorrect) return "Try Again";

  return null;
};

export default {
  inputEmail,
  inputPassword,
  login,
};
