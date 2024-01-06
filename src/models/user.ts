import { Schema, model, Types } from "mongoose";

import { IImage } from "../utils/namespaces.js";

export interface IPublicProfile {
  id: string;
  name: string;
  image: IImage;
}

export interface IAccessToken {
  id: string;
  ip: string;
  createdAt: number;
}

export interface IUser {
  _id: Types.ObjectId;
  public: IPublicProfile;
  email: string;
  password: string;
  accessToken: IAccessToken;
}

const userSchema = new Schema<IUser>(
  {
    public: { type: {} as IPublicProfile, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: {} as IAccessToken, required: true },
  },
  { versionKey: false }
);

const User = model<IUser>("User", userSchema);
export default User;
