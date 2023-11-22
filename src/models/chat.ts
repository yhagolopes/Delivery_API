import { Schema, model, Types } from "mongoose";

export interface IMessage {
  // Maybe i should use username instead user id
  userId: string;
  text: string;
  sendedAt: number;
}

interface IChat {
  _id: Types.ObjectId;
  onwersId: string[];
  messages: IMessage[];
}

const chatSchema = new Schema<IChat>(
  {
    onwersId: { type: [String], required: true },
    messages: { type: [{} as IMessage], default: [] },
  },
  { versionKey: false }
);

const Chat = model<IChat>("Chats", chatSchema);
export default Chat;
