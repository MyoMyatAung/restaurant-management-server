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
import { Func, validateAuthority } from "../middlewares/validateAuthority";

const itemRouter = Router();

const funcName = "item";

itemRouter.post(
  "/",
  validateAuthority(funcName, Func.Create),
  upload.array("imgs"),
  validate(itemSchema),
  createItemHandler
);
itemRouter.get("/", validateAuthority(funcName, Func.Read), getItemsHandler);
itemRouter.put("/:id", updateItemHandler);
itemRouter.delete("/:id", deleteItemHandler);

export default itemRouter;
