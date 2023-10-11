import { Router } from "express";
import {
  createItemCategoryHandler,
  deleteItemCategoryHandler,
  getItemCategoriesHandler,
  updateItemCategoryHandler,
} from "../controllers/item-category.controller";
import { validate } from "../middlewares/validateResources";
import { itemCategorySchema } from "../schema/item-category.schema";
import { Func, funName, validateAuthority } from "../middlewares/validateAuthority";

const itemCategoryRouter = Router();

const funcName = funName.item_category.key;

itemCategoryRouter.get(
  "/",
  validateAuthority(funcName, Func.Read),
  getItemCategoriesHandler
);
itemCategoryRouter.post(
  "/",
  validateAuthority(funcName, Func.Create),
  validate(itemCategorySchema),
  createItemCategoryHandler
);
itemCategoryRouter.put("/:id", updateItemCategoryHandler);
itemCategoryRouter.delete("/:id", deleteItemCategoryHandler);

export default itemCategoryRouter;
