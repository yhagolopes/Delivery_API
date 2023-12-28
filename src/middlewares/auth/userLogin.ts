import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";

const authUserLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body;

  const error = await authErrors.userLogin(email, password);
  if (error !== null) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default authUserLogin;
