import {
  FilterQuery,
  ProjectionFields,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import PermissionModel, {
  PermissionDocument,
  PermissionInput,
} from "../models/permission.model";

export async function createPermission(input: PermissionInput) {
  return await PermissionModel.create(input);
}

export async function findPermission(
  query?: FilterQuery<PermissionDocument>,
  projection?: ProjectionFields<PermissionDocument>,
  options: QueryOptions = { lean: true }
) {
  return await PermissionModel.find(query || {}, projection, options);
}

export async function updatePermission(
  query: FilterQuery<PermissionDocument>,
  update: UpdateQuery<PermissionDocument>,
  options: QueryOptions = { new: true }
) {
  return await PermissionModel.findOneAndUpdate(query, update, options);
}

export async function deletePermission(
  query: FilterQuery<PermissionDocument>,
  options: QueryOptions = { new: true }
) {
  return await PermissionModel.findOneAndDelete(query, options);
}
