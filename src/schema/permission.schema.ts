import { object, string, boolean, TypeOf } from "zod";

export const createPermissionSchema = object({
  body: object({
    label: string({ required_error: "Permission label is required" }),
    feature: string({ required_error: "Permission feature is required" }),
    granted: object({
      read: boolean().optional(),
      create: boolean().optional(),
      update: boolean().optional(),
      delete: boolean().optional(),
    }),
  }),
});

export type CreatePermissionInput = TypeOf<typeof createPermissionSchema>;
