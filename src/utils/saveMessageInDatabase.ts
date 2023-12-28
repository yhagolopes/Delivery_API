import Chat from "../models/chat.js";

import { IMessage } from "./namespaces.js";
// Fields equals to undefined will be ignored
const saveMessageInDatabase = async (chatId: string, message: IMessage) => {
  await Chat.findOne({ _id: chatId }).updateOne({
    $push: {
      messages: message,
    },
  });
};

export default saveMessageInDatabase;
