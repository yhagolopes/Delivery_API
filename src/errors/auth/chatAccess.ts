import { Types } from "mongoose";

import Chat from "../../models/chat.js";
import { getStoredToken } from "../../utils/utils.js";
import { isRequesterAChatOnwer } from "../../utils/utils.js";

const authChatAccess = async (
  chatId: string,
  accessToken: string
): Promise<string | null> => {
  const isAValidId = Types.ObjectId.isValid(chatId);
  if (!isAValidId) return "Invalid ID";

  const storedChat = await Chat.findOne({ _id: chatId });
  if (storedChat === null) return "Invalid Chat";

  const { onwer } = await getStoredToken(accessToken);
  const isAOnwer = isRequesterAChatOnwer(onwer.publicId, storedChat.onwersId);
  if (!isAOnwer) return "Requester Is Not An Onwer";

  return null;
};

export default authChatAccess;
