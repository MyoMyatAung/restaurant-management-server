import { Router } from "express";
import {
  createItemCategoryHandler,
  deleteItemCategoryHandler,
  getItemCategoriesHandler,
  updateItemCategoryHandler,
} from "../controllers/item-category.controller";
import { validate } from "../middlewares/validateResources";
import { itemCategorySchema } from "../schema/item-category.schema";

const itemCategoryRouter = Router();

itemCategoryRouter.get("/", getItemCategoriesHandler);
itemCategoryRouter.post(
  "/",
  validate(itemCategorySchema),
  createItemCategoryHandler
);
itemCategoryRouter.put("/:id", updateItemCategoryHandler);
itemCategoryRouter.delete("/:id", deleteItemCategoryHandler);

export default itemCategoryRouter;
