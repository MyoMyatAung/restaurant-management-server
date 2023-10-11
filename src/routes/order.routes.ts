import { Router } from "express";
import {
  createOrderHandler,
  getOrderHandler,
} from "../controllers/order.controller";
import { validate } from "../middlewares/validateResources";
import { orderSchema } from "../schema/order.schema";
import { Func, funName, validateAuthority } from "../middlewares/validateAuthority";

const funcName = funName.order.key

const orderRouter = Router();

orderRouter.post("/", validateAuthority(funcName, Func.Create), validate(orderSchema), createOrderHandler);

orderRouter.get("/", validateAuthority(funcName, Func.Read), getOrderHandler);

export default orderRouter;
