import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ItemCategoryInput {
  name: string;
  createdBy: UserDocument["_id"];
  updatedBy: UserDocument["_id"];
}

export interface ItemCategoryDocument
  extends ItemCategoryInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const itemCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

const ItemCategoryModel = mongoose.model<ItemCategoryDocument>(
  "ItemCategory",
  itemCategorySchema
);

export default ItemCategoryModel;
