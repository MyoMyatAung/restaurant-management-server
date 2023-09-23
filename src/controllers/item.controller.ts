import { Request, Response } from "express";
import {
  createItem,
  findItems,
  findOneItems,
  updateItems,
} from "../services/item.service";
import { CreateItemInput, UpdateItemInput } from "../schema/item.schema";

/**
 * @POST /api/v1/items
 */
export async function createItemHandler(
  req: Request<{}, {}, CreateItemInput["body"]>,
  res: Response
) {
  try {
    const fileArray = req.files && Object.values(req.files);
    const imgs: Array<string> = fileArray?.map(
      (f) => `http://localhost:1337/api/v1/${f.filename}`
    ) as Array<string>;
    const item = await createItem({
      ...req.body,
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
    const items = await findItems();
    return res.status(200).json(items);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @PUT /api/v1/items/:id
 */
export async function updateItemHandler(
  req: Request<UpdateItemInput["params"], {}, UpdateItemInput["body"]>,
  res: Response
) {
  try {
    const existedItem = await findOneItems(req.params);
    if (!existedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const fileArray = req.files && Object.values(req.files);
    const imgs: Array<string> = fileArray?.map(
      (f) => `http://localhost:1337/api/v1/${f.filename}`
    ) as Array<string>;
    console.log(imgs);
    const preparedUpdatedItem = {
      ...req.body,
      imgs: [...existedItem.imgs, ...imgs],
    };

    const updatedItem = await updateItems(
      req.params,
      preparedUpdatedItem,
      res.locals.user._id
    );
    return res.status(200).json(updatedItem);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @DELETE /api/v1/items/:id
 */
export async function deleteItemHandler(req: Request, res: Response) {}
