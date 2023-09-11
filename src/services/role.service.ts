import { FilterQuery, ProjectionFields, QueryOptions, UpdateQuery } from "mongoose";
import RoleModel, { RoleDocument, RoleInput } from "../models/role.model";

export async function createRole(input: RoleInput) {
  return await RoleModel.create(input);
}

export async function findRoles(
  query?: FilterQuery<RoleDocument>,
  projection?: ProjectionFields<RoleDocument>,
  option: QueryOptions = { lean: true }
) {
  return await RoleModel.find(query || {}, projection, option).populate("permissions");
}

export async function updateRoles(
  query: FilterQuery<RoleDocument>,
  update: UpdateQuery<RoleDocument>,
  option: QueryOptions = { new: true }
){
  return await RoleModel.findOneAndUpdate(query, update, option);
}