import mongoose from "mongoose";
import { ItemDocument } from "./item.model";
import { UserDocument } from "./user.model";

export interface OrderMenuInput {
  itemId: ItemDocument["_id"];
  count: number;
  amountPerItem: number;
  totalAmount: number;
}

export interface OrderInput {
  amount: number;
  orderStatus?: string;
  orderMenu: Array<OrderMenuInput>;
  createdBy: UserDocument["_id"];
  updatedBy: UserDocument["_id"];
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const orderMenuSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    amountPerItem: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "pending"
    },
    orderMenu: [orderMenuSchema],
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

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
