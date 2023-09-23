import { any, array, number, object, string, TypeOf } from "zod";

const params = {
  params: object({
    _id: string({ required_error: "Item Id is required" }),
  }),
};

const body = {
  body: object({
    name: string({ required_error: "Item name is required" }),
    price: number({ required_error: "Item price is required" }),
    description: string({ required_error: "Item description is required" }),
    itemCategory: string({ required_error: "Item category is required" }),
  }),
};

const fileSchema = object({
  filename: string(),
  mimetype: string(),
  fieldname: string(),
  size: number(),
});

export const createItemSchema = object({
  ...body,
  files: array(fileSchema),
});

export const updateItemSchema = object({
  ...body,
  ...params,
  files: array(fileSchema),
})

export type CreateItemInput = TypeOf<typeof createItemSchema>;

export type UpdateItemInput = TypeOf<typeof updateItemSchema>;
