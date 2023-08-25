import { Request, Response } from "express";
import { ItemCategoryInput } from "../schema/item-category.schema";
import {
  createItemCategory,
  findItemCategory,
} from "../services/item-category.service";

/**
 * @POST /api/v1/item-categories
 */
export async function createItemCategoryHandler(
  req: Request<{}, {}, ItemCategoryInput["body"]>,
  res: Response
) {
  try {
    const createdItemCategory = await createItemCategory({
      ...req.body,
      createdBy: res.locals.user._id,
      updatedBy: res.locals.user._id,
    });
    return res.status(201).json(createdItemCategory);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @GET /api/v1/item-categories
 */
export async function getItemCategoriesHandler(req: Request, res: Response) {
  try {
    const itemCategories = await findItemCategory(req.query);
    return res.status(200).json(itemCategories);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @PUT /api/v1/item-categories/:id
 */
export async function updateItemCategoryHandler(req: Request, res: Response) {}

/**
 * @DELETE /api/v1/item-categories/:id
 */
export async function deleteItemCategoryHandler(req: Request, res: Response) {}
