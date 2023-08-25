import { Router } from "express";
import {
  createItemHandler,
  deleteItemHandler,
  getItemsHandler,
  updateItemHandler,
} from "../controllers/item.controller";
import upload from "../utils/multer.utils";
import { validate } from "../middlewares/validateResources";
import { itemSchema } from "../schema/item.schema";

const itemRouter = Router();

itemRouter.post(
  "/",
  upload.array("imgs"),
  validate(itemSchema),
  createItemHandler
);
itemRouter.get("/", getItemsHandler);
itemRouter.put("/:id", updateItemHandler);
itemRouter.delete("/:id", deleteItemHandler);

export default itemRouter;
