import { decodifyToken } from "../config/jsonwebtoken.js";
import Token, { TOKEN_EXPIRES_IN, IAccessToken } from "../models/token.js";
import { hasExpired } from "../utils/utils.js";

const validateAccessToken = async (
  accessToken: string,
  requesterIp: string
): Promise<string | null> => {
  const decodedToken = decodifyToken(accessToken) as IAccessToken | null;
  if (decodedToken === null) return "Invalid Token";

  const storedToken = await Token.findOne({ _id: decodedToken.tokenId });
  if (storedToken === null) return "Not Exists in DB";

  if (requesterIp !== storedToken.onwer.ip) return "Invalid IP";

  const hasTokenExpired = hasExpired(storedToken.createdAt, TOKEN_EXPIRES_IN);
  if (hasTokenExpired) return "Token Expired";

  return null;
};

export default validateAccessToken;
