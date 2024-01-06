import { Request, Response, NextFunction } from "express";

import authErrors from "../../errors/auth/auth.js";
import getUserFromToken from "../../utils/getUserFromToken.js";

export const authAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { accessToken } = request.body;

  const user = await getUserFromToken(accessToken);
  const error = authErrors.admin(user.email);
  if (!error) {
    response.status(400).json({ message: error });
    return;
  }

  next();
};

export default authAdmin;
