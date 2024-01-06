import Chat, { IMessage } from "../models/chat.js";

// Fields equals to undefined will be ignored
const saveMessageInDatabase = async (chatId: string, message: IMessage) => {
  await Chat.findOne({ _id: chatId }).updateOne({
    $push: {
      messages: message,
    },
  });
};

export default saveMessageInDatabase;
