import { hasExpired } from "../utils/utils.js";
import Code from "../models/code.js";
import { CODE_EXPIRES_IN } from "../models/code.js";

const validateRegisterCode = async (
  codeId: string,
  code: string | number,
  requesterIp: string,
  requesterEmail: string
): Promise<string | null> => {
  const requestedCode = await Code.findOne({ _id: codeId });
  if (requestedCode === null) return "Code Not Exists";

  if (requestedCode.requester.email !== requesterEmail)
    return "Different Email";

  if (requestedCode.requester.ip !== requesterIp) return "Different Location";

  if (requestedCode.code != code) return "Incorret Code";

  const hasCodeExpired = hasExpired(requestedCode.createdAt, CODE_EXPIRES_IN);
  if (hasCodeExpired) return "Code Expired";

  return null;
};

export default validateRegisterCode;
