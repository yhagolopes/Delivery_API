import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";
import { getStoredToken } from "../../utils/utils.js";

export const authAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.body;
  const { onwer } = await getStoredToken(accessToken);

  const error = authErrors.admin(onwer.email);
  if (!error) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default authAdmin;
