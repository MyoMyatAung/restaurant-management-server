import { object, string, array, TypeOf } from "zod";

const body = {
  body: object({
    title: string({ required_error: "Role title is required" }),
    description: string({ required_error: "Role description is required" }),
    permissions: array(string()).min(1, "Role must include at least one permission"),
  }),
};

const params = {
  params: object({
    _id: string({ required_error: "Role ID is required" }),
  }),
};

export const createRoleSchema = object({
  ...body,
});

export const updateRoleSchema = object({
  ...body,
  ...params,
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>;

export type UpdateRoleInput = TypeOf<typeof updateRoleSchema>;
