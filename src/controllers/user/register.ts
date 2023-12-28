import { Request, Response } from "express";

import User from "../../models/user.js";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";

const register = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // Codify password to compare it later with original password
  const codifiedPassword = await hash(password, 10);
  const storedUser = await User.create({
    public: {
      id: randomUUID(),
      name: "John Doe",
    },
    email: email,
    password: codifiedPassword,
  });
  if (storedUser === null) {
    response.status(500).json({ message: "Bad User Creation" });
    return;
  }

  response.status(200).json({ message: "User Created" });
};

export default register;
