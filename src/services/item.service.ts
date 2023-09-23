import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ItemModel, { ItemDocument, ItemInput } from "../models/item.model";

export async function createItem(input: ItemInput) {
  try {
    const item = await ItemModel.create(input);
    return item;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findOneItems(query?: FilterQuery<ItemDocument>) {
  return ItemModel.findOne(query);
}

export async function findItems(
  query?: FilterQuery<ItemDocument>,
  options: QueryOptions = { lean: true }
) {
  return ItemModel.find(query || {}, {}, options);
}

export async function updateItems(
  query: FilterQuery<ItemDocument>,
  update: UpdateQuery<ItemDocument>,
  updatedBy: string,
  options: QueryOptions = { new: true }
) {
  return ItemModel.findOneAndUpdate(query, { ...update, updatedBy }, options);
}
