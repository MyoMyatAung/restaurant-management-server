import { FilterQuery, QueryOptions } from "mongoose";
import ItemCategoryModel, {
  ItemCategoryDocument,
  ItemCategoryInput,
} from "../models/item-category.model";

export async function createItemCategory(input: ItemCategoryInput) {
  try {
    const itemCategory = await ItemCategoryModel.create(input);
    return itemCategory;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findItemCategory(
  query: FilterQuery<ItemCategoryDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const itemCategories = await ItemCategoryModel.find(query, {}, options);
    return itemCategories;
  } catch (error: any) {
    throw new Error(error);
  }
}
