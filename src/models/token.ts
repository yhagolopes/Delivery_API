import { Schema, model, Types } from "mongoose";

// Hours * Milliseconds
export const TOKEN_EXPIRES_IN: number = 48 * 3600000;

export interface IAccessToken {
  tokenId: string;
}

interface IOnwer {
  publicId: string;
  ip: string;
  email: string;
}

export interface IToken {
  _id: Types.ObjectId;
  onwer: IOnwer;
  createdAt: number;
}

const tokensSchema = new Schema<IToken>(
  {
    onwer: { type: {} as IOnwer, required: true },
    createdAt: { type: Number, default: Date.now() },
  },
  { versionKey: false }
);

const Token = model<IToken>("Tokens", tokensSchema);
export default Token;
