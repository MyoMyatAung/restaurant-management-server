import { object, string, boolean, TypeOf } from "zod";

const body = {
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
};

const params = {
  params: object({
    _id: string({ required_error: "Permission ID is required" }),
  }),
};

export const createPermissionSchema = object({
  ...body,
});

export const updatePermissionSchema = object({
  ...body,
  ...params,
});

export const deletePermissionSchema = object({
  ...params,
});

export type CreatePermissionInput = TypeOf<typeof createPermissionSchema>;

export type UpdatePermissionInput = TypeOf<typeof updatePermissionSchema>;

export type DeletePermissionInput = TypeOf<typeof deletePermissionSchema>;
