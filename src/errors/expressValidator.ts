import { ValidationChain } from "express-validator";
import { body } from "express-validator";

import User from "../models/user.js";

const userEmail = (): ValidationChain => {
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

const userPassword = (): ValidationChain => {
  return body("password")
    .notEmpty()
    .withMessage("Password Required")

    .isLength({ min: 6, max: 12 })
    .withMessage("Passwords Must Be 6-12");
};

const expressValidatorChains = {
  userEmail,
  userPassword,
};

export default expressValidatorChains;
