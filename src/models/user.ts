import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  codifiedPassword: string;
  chatId: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    codifiedPassword: { type: String, required: true },

    // Each user will have a chatId
    // To send a message this id will be passed as a parameter
    chatId: { type: String, required: true },
  },
  { versionKey: false }
);

const User = model<IUser>("User", userSchema);
export default User;
