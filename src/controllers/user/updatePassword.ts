import { Request, Response } from "express";

import getUserFromToken from "../../utils/getUserFromToken.js";
import { hash } from "bcrypt";

const updatePassword = async (request: Request, response: Response) => {
  const { password, accessToken } = request.body;

  const user = await getUserFromToken(accessToken);

  const encrypted = await hash(password, 10);
  user.updateOne({
    $set: { password: encrypted },
  });
};

export default updatePassword;
