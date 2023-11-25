import { Schema, model, Types } from "mongoose";

// Hours * Milliseconds
export const TOKEN_EXPIRES_IN: number = 48 * 3600000;

export interface IAccessToken {
  tokenId: string;
}

interface IOnwer {
  id: string;
  ip: string;
}

export interface IToken {
  _id: Types.ObjectId;
  onwer: IOnwer;
  createdAt: number;
}

const tokensSchema = new Schema<IToken>(
  {
    onwer: {
      id: { type: String, required: true },
      ip: { type: String, required: true },
    },
    createdAt: { type: Number, default: Date.now() },
  },
  { versionKey: false }
);

const Token = model<IToken>("Tokens", tokensSchema);
export default Token;
