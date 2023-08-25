import { Router } from "express";
import {
  createOrderHandler,
  getOrderHandler,
} from "../controllers/order.controller";
import { validate } from "../middlewares/validateResources";
import { orderSchema } from "../schema/order.schema";

const orderRouter = Router();

orderRouter.post("/", validate(orderSchema), createOrderHandler);

orderRouter.get("/", getOrderHandler);

export default orderRouter;
