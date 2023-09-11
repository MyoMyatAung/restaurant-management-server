import { object, string, array, TypeOf } from "zod";

export const createRoleSchema = object({
  body: object({
    title: string({ required_error: "Role title is required" }),
    description: string({ required_error: "Role description is required" }),
    permissions: array(string()).min(1),
  }),
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>;
