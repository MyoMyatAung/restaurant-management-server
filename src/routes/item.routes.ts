import { Router } from "express";
import {
  createItemHandler,
  deleteItemHandler,
  getItemsHandler,
  updateItemHandler,
} from "../controllers/item.controller";
import upload from "../utils/multer.utils";
import { validate, validateFormData } from "../middlewares/validateResources";
import { Func, validateAuthority } from "../middlewares/validateAuthority";
import { createItemSchema, updateItemSchema } from "../schema/item.schema";

const itemRouter = Router();

const funcName = "item";

itemRouter.post(
  "/",
  validateAuthority(funcName, Func.Create),
  upload.array("imgs"),
  validateFormData(createItemSchema),
  createItemHandler
);
itemRouter.get("/", validateAuthority(funcName, Func.Read), getItemsHandler);
itemRouter.put(
  "/:_id",
  validateAuthority(funcName, Func.Update),
  upload.array("imgs"),
  validateFormData(updateItemSchema),
  updateItemHandler
);
itemRouter.delete("/:_id", deleteItemHandler);

export default itemRouter;
