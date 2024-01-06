import { Types } from "mongoose";

import { hasExpired } from "../../utils/utils.js";
import Code from "../../models/code.js";

// Minutes * Milliseconds
export const TIME_TO_CODE_EXPIRE: number = 5 * 60000;

const authRegisterCode = async (
  codeId: string,
  code: string | number,
  requesterIp: string,
  requesterEmail: string
): Promise<string | null> => {
  const isAValidId = Types.ObjectId.isValid(codeId);
  if (!isAValidId) return "Invalid ID";

  const requestedCode = await Code.findOne({ _id: codeId });
  if (requestedCode === null) return "Code Not Exists";

  if (requestedCode.onwer.email !== requesterEmail) return "Different Email";

  if (requestedCode.onwer.ip !== requesterIp) return "Different Location";

  if (requestedCode.code != code) return "Incorret Code";

  const hasCodeExpired = hasExpired(
    requestedCode.createdAt,
    TIME_TO_CODE_EXPIRE
  );
  if (hasCodeExpired) return "Code Expired";

  return null;
};

export default authRegisterCode;
