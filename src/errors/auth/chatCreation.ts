import Chat from "../../models/chat.js";
import User from "../../models/user.js";
import authAdmin from "./admin.js";
import { getStoredToken } from "../../utils/utils.js";

const _preventMutiplesChatWithSameUser = async (
  onwersToAdd: string[]
): Promise<string | null> => {
  const chatExists = await Chat.findOne({
    onwersId: { $in: [onwersToAdd, onwersToAdd.reverse()] },
  });
  if (chatExists !== null) {
    return chatExists._id as unknown as string;
  }

  return null;
};

export const _isOneOfUsersAnAdmin = (
  userEmail1: string,
  userEmail2: string
): boolean => {
  const user1 = authAdmin(userEmail1);
  const user2 = authAdmin(userEmail2);
  if (user1 || user2) return true;

  return false;
};

interface ICreation {
  error: string | null;
  chatId: string | null;
}
const authChatCreation = async (
  requestedUserId: string,
  requesterAccessToken: string
): Promise<ICreation> => {
  const objectToReturn: ICreation = { error: null, chatId: null };

  const requestedUser = await User.findOne({ "public.id": requestedUserId });
  if (requestedUser === null) {
    objectToReturn.error = "User ID Not Exists";
    return objectToReturn;
  }

  const { onwer } = await getStoredToken(requesterAccessToken);

  const isOneOfUsersAnAdmin = _isOneOfUsersAnAdmin(
    requestedUser.email,
    onwer.email
  );
  if (!isOneOfUsersAnAdmin) {
    objectToReturn.error = "One Of Users Have To Be An Admin";
    return objectToReturn;
  }

  const onwersToAdd = [onwer.publicId, requestedUser.public.id];
  const chatId = await _preventMutiplesChatWithSameUser(onwersToAdd);
  if (chatId !== null) {
    objectToReturn.error = "Chat Already Exists";
    objectToReturn.chatId = chatId;
    return objectToReturn;
  }

  return objectToReturn;
};

export default authChatCreation;
