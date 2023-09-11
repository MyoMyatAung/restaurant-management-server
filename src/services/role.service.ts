import { FilterQuery, ProjectionFields, QueryOptions } from "mongoose";
import RoleModel, { RoleDocument, RoleInput } from "../models/role.model";

export async function createRole(input: RoleInput) {
  return await RoleModel.create(input);
}

export async function findRoles(
  query?: FilterQuery<RoleDocument>,
  projection?: ProjectionFields<RoleDocument>,
  option: QueryOptions = { lean: true }
) {
  return await RoleModel.find(query || {}, projection, option);
}
