import { Schema, model, Types } from "mongoose";
import { IImage } from "../utils/namespaces.js";

export interface IMessage {
  userId: string;
  text?: string;
  image?: IImage;
  sendedAt: number;
}

export interface IChat {
  _id: Types.ObjectId;
  members: string[];
  messages: IMessage[];
}

const chatSchema = new Schema<IChat>(
  {
    members: { type: [String], required: true },
    messages: { type: [{} as IMessage], default: [] },
  },
  { versionKey: false }
);

const Chat = model<IChat>("Chats", chatSchema);
export default Chat;
