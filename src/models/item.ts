import { Schema, Types, model } from "mongoose";

interface IItem {
  _id: Types.ObjectId;
  name: string;
  price: number;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false }
);

const Item = model<IItem>("Items", itemSchema);
export default Item;
