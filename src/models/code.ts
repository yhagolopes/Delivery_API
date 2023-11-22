import { Schema, model, Types } from "mongoose";

// Minutes * Milliseconds
export const CODE_EXPIRES_IN: number = 5 * 60000;

interface IRequester {
  ip: string;
  email: string;
}

export interface ICode {
  _id: Types.ObjectId;
  code: number;
  requester: IRequester;
  createdAt: number;
}

const codeSchema = new Schema<ICode>(
  {
    code: { type: Number, required: true },
    requester: {
      ip: { type: String, required: true },
      email: { type: String, required: true },
    },
    createdAt: { type: Number, default: Date.now() },
  },
  { versionKey: false }
);

const Code = model<ICode>("Code", codeSchema);
export default Code;
