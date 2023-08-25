import { Request, Response } from "express";
import { ItemInput } from "../schema/item.schema";
import { createItem, getItems } from "../services/item.service";

/**
 * @POST /api/v1/items
 */
export async function createItemHandler(
  req: Request<{}, {}, ItemInput["body"]>,
  res: Response
) {
  try {
    const fileArray = req.files && Object.values(req.files);
    const imgs: Array<string> = fileArray?.map(
      (f) => `http://localhost:1337/api/v1/${f.filename}`
    ) as Array<string>;
    const item = await createItem({
      ...req.body,
      price: parseFloat(req.body.price),
      imgs: imgs,
      createdBy: res.locals.user._id,
      updatedBy: res.locals.user._id,
    });
    return res.status(201).json(item);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @GET /api/v1/items
 */
export async function getItemsHandler(req: Request, res: Response) {
  try {
    const items = await getItems();
    return res.status(200).json(items);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @PUT /api/v1/items/:id
 */
export async function updateItemHandler(req: Request, res: Response) {}

/**
 * @DELETE /api/v1/items/:id
 */
export async function deleteItemHandler(req: Request, res: Response) {}
