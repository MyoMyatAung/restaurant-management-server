import mongoose from "mongoose";

export interface Granted {
  read?: boolean;
  create?: boolean;
  update?: boolean;
  delete?: boolean;
}

export interface PermissionInput {
  label: string;
  feature: string;
  granted: Granted;
}

export interface PermissionDocument extends PermissionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const grantedSchema = new mongoose.Schema(
  {
    read: {
      type: Boolean,
      default: false,
    },
    create: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const permissionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    feature: {
      type: String,
      required: true,
    },
    granted: grantedSchema,
  },
  { timestamps: true }
);

const PermissionModel = mongoose.model<PermissionDocument>(
  "Permission",
  permissionSchema
);

export default PermissionModel;
