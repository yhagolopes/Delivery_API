import { ValidationChain, body } from "express-validator";
import User from "../models/user.js";

export const validateEmail = (): ValidationChain => {
  return body("email")
    .notEmpty()
    .withMessage("EMAIL REQUIRED.")

    .isLength({ max: 64 })
    .withMessage("EMAIL TOO LONG.")

    .isEmail()
    .withMessage("EMAIL NOT VALID.")

    .custom(async (email: string) => {
      const user = await User.findOne({ email });
      if (user !== null) {
        throw new Error("EMAIL ALREADY EXISTS.");
      }
    });
};

export const validatePassword = (): ValidationChain => {
  return body("password")
    .notEmpty()
    .withMessage("PASSWORD REQUIRED.")

    .isLength({ min: 6, max: 12 })
    .withMessage("PASSWORDS MUST BE 6-12.");
};
