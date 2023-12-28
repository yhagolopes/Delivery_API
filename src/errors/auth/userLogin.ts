import User from "../../models/user.js";
import { compare } from "bcrypt";

export const authUserLogin = async (
  userEmail: string,
  userPassword: string
): Promise<string | null> => {
  const requestedUser = await User.findOne({ email: userEmail });
  if (requestedUser === null) return "Try Again";

  const isPasswordCorrect: boolean = await compare(
    userPassword,
    requestedUser.password
  );
  if (!isPasswordCorrect) return "Try Again";

  return null;
};

export default authUserLogin;
