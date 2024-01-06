import { Types } from "mongoose";

import Chat from "../../models/chat.js";
import getUserFromToken from "../../utils/getUserFromToken.js";
import { isRequesterAChatOnwer } from "../../utils/utils.js";

const authChatAccess = async (
  chatId: string,
  accessToken: string
): Promise<string | null> => {
  const isAValidId = Types.ObjectId.isValid(chatId);
  if (!isAValidId) return "Invalid ID";

  const storedChat = await Chat.findOne({ _id: chatId });
  if (storedChat === null) return "Invalid Chat";

  const user = await getUserFromToken(accessToken);
  const isAOnwer = isRequesterAChatOnwer(user.public.id, storedChat.members);
  if (!isAOnwer) return "Requester Is Not An Onwer";

  return null;
};

export default authChatAccess;
