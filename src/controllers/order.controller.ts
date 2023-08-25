import { Request, Response } from "express";
import { OrderInput } from "../schema/order.schema";
import { createOrder, findOrder } from "../services/order.service";

/**
 * @POST /api/v1/orders
 */
export async function createOrderHandler(
  req: Request<{}, {}, OrderInput["body"]>,
  res: Response
) {
  try {
    const order = await createOrder({
      ...req.body,
      createdBy: res.locals.user._id,
      updatedBy: res.locals.user._id,
    });
    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

/**
 * @GET /api/v1/orders
 */
export async function getOrderHandler(req: Request, res: Response) {
  try {
    const orders = await findOrder();
    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
