import User from "../models/user.js";
import { decodifyToken } from "../config/jsonwebtoken.js";

interface IDecodedToken {
  tokenId: string;
}
// Dont use this function without validations
const getUserFromToken = async (accessToken: string) => {
  const { tokenId } = decodifyToken(accessToken) as IDecodedToken;

  const storedUser = await User.findOne({ "accessToken.id": tokenId });
  return storedUser!;
};

export default getUserFromToken;
