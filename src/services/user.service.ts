import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export async function validateUser(email: string, password: string) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return false;
    }
    const userToBeReturn = await user.populate({
      path: "role",
      populate: { path: "permissions" },
    });
    return omit(userToBeReturn.toJSON(), "password");
  } catch (error) {
    return false;
  }
}

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = { new: true }
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function findUser(
  query?: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  return await UserModel.find(query || {}, {}, options);
}
