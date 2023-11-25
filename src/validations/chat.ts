import Chat from "../models/chat.js";
import { getStoredToken } from "../utils/utils.js";
import { isRequesterAChatOnwer } from "../utils/utils.js";

const creation = () => {};

const access = async (
  chatId: string,
  accessToken: string
): Promise<string | null> => {
  const storedChat = await Chat.findOne({ _id: chatId });
  if (storedChat === null) return "Invalid Chat";

  const { onwer } = await getStoredToken(accessToken);
  const isAOnwer = isRequesterAChatOnwer(onwer.id, storedChat.onwersId);
  if (!isAOnwer) return "Requester Is Not An Onwer";

  return null;
};

export default {
  creation,
  access,
};
