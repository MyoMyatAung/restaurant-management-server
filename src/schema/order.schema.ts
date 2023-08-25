import { object, string, number, TypeOf, array } from "zod";

export const orderMenuSchema = object({
  itemId: string({ required_error: "Item ID is required" }),
  count: number({ required_error: "Item count is required" }),
  amountPerItem: number({ required_error: "Item price is required" }),
  totalAmount: number({ required_error: "Item total amount is required" }),
});

export const orderSchema = object({
  body: object({
    amount: number({ required_error: "Order amount is required" }),
    orderStatus: string().optional(),
    orderMenu: array(orderMenuSchema),
  }),
});

export type OrderInput = TypeOf<typeof orderSchema>;
