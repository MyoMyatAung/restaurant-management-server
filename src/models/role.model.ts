import mongoose from "mongoose";
import { PermissionDocument } from "./permission.model";

export interface RoleInput {
  title: string;
  description: string;
  permissions: Array<PermissionDocument["_id"]>;
}

export interface RoleDocument extends RoleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: [
      { type: mongoose.Types.ObjectId, ref: "Permission", required: true },
    ],
  },
  { timestamps: true }
);

const RoleModel = mongoose.model<RoleDocument>("Role", roleSchema);

export default RoleModel;
