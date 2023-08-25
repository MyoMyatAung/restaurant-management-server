import { object, string, TypeOf } from "zod";

export const itemCategorySchema = object({
  body: object({
    name: string({ required_error: "Category name is required" }),
  }),
});

export type ItemCategoryInput = TypeOf<typeof itemCategorySchema>;
