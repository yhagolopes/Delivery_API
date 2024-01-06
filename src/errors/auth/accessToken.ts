import User from "../../models/user.js";

import { decodifyToken } from "../../config/jsonwebtoken.js";
import { hasExpired } from "../../utils/utils.js";
import { IUserToken } from "../../utils/namespaces.js";

// Hour * Milliseconds
const TIME_TO_TOKEN_EXPIRE: number = 48 * 3600000;

const authAccessToken = async (
  accessToken: string,
  requesterIp: string
): Promise<string | null> => {
  const decodedToken = decodifyToken(accessToken) as IUserToken | null;
  if (decodedToken === null) return "Invalid Token";

  const user = await User.findOne({ "accessToken.id": decodedToken.tokenId });
  if (user === null) return "Token Not Exists";

  if (user.accessToken.ip !== requesterIp) return "User Invalid IP";

  const hasTokenExpired = hasExpired(
    user.accessToken.createdAt,
    TIME_TO_TOKEN_EXPIRE
  );
  if (hasTokenExpired) return "Token Expired";

  return null;
};

export default authAccessToken;
