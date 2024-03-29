import { Schema, model, Types } from "mongoose";

interface IOnwer {
  ip: string;
  email: string;
}

export interface ICode {
  _id: Types.ObjectId;
  code: number;
  onwer: IOnwer;
  createdAt: number;
}

const codeSchema = new Schema<ICode>(
  {
    code: { type: Number, required: true },
    onwer: { type: {} as IOnwer, required: true },
    createdAt: { type: Number, default: Date.now() },
  },
  { versionKey: false }
);

const Code = model<ICode>("Code", codeSchema);
export default Code;
