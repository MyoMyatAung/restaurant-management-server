import { FilterQuery, QueryOptions } from "mongoose";
import OrderModel, { OrderDocument, OrderInput } from "../models/order.model";

export async function createOrder(input: OrderInput) {
  return await OrderModel.create(input);
}

export async function findOrder(
  query?: FilterQuery<OrderDocument>,
  options: QueryOptions = { lean: true }
) {
  return await OrderModel.find(query || {}, {}, options);
}
