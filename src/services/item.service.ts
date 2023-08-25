import { FilterQuery, QueryOptions } from "mongoose";
import ItemModel, { ItemDocument, ItemInput } from "../models/item.model";

export async function createItem(input: ItemInput) {
  try {
    const item = await ItemModel.create(input);
    return item;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getItems(
  query?: FilterQuery<ItemDocument>,
  options: QueryOptions = { lean: true }
) {
  return ItemModel.find(query || {}, {}, options);
}
