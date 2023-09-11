import { FilterQuery, ProjectionFields, QueryOptions } from "mongoose";
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
