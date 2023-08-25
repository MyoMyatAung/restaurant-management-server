import { any, array, number, object, string, TypeOf } from "zod";

const fileSchema = object({
  filename: string(),
  mimetype: string(),
  fieldname: string(),
  size: number(),
});

export const itemSchema = object({
  body: object({
    name: string({ required_error: "Item name is required" }),
    price: string({ required_error: "Item price is required" }),
    description: string({ required_error: "Item description is required" }),
    itemCategory: string({ required_error: "Item category is required" }),
  }),
  files: array(fileSchema),
});

export type ItemInput = TypeOf<typeof itemSchema>;
