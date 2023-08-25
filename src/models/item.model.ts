import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { ItemCategoryDocument } from "./item-category.model";

export interface ItemInput {
  name: string;
  price: number;
  description: string;
  itemCategory: ItemCategoryDocument["_id"];
  imgs: Array<string>;
  createdBy: UserDocument["_id"];
  updatedBy: UserDocument["_id"];
}

export interface ItemDocument extends ItemInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgs: [
      {
        type: String,
        required: true,
      },
    ],
    itemCategory: {
      type: mongoose.Types.ObjectId,
      ref: "ItemCategory",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model<ItemDocument>("Item", itemSchema);

export default ItemModel;
